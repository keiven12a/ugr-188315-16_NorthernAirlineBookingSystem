<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';


requirePassengerLogin();

$raw = file_get_contents("php://input");
$data = json_decode($raw);

// Debug log incoming requests for troubleshooting
file_put_contents(__DIR__ . '/delay_debug.log', "[".date('c')."] INPUT: ".substr($raw,0,2000)."\nSESSION: ".json_encode(array_intersect_key($_SESSION, array('user_id'=>1,'admin_id'=>1)))."\n\n", FILE_APPEND);

if (empty($data->booking_id) || empty($data->new_flight_id)) {
    jsonResponse(false, 'Missing required fields', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Begin transaction
$db->beginTransaction();

try {
    $passenger_id = getCurrentUserId();
    // Allow fallback passenger_id in request for debugging or non-cookie clients
    if (empty($passenger_id) && !empty($data->passenger_id)) {
        $passenger_id = $data->passenger_id;
    }
    
    // Get original booking
    $query = "SELECT b.*, f.price as original_price
              FROM bookings b
              JOIN flights f ON b.flight_id = f.id
              WHERE b.id = :booking_id AND b.passenger_id = :passenger_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindValue(':booking_id', $data->booking_id);
    $stmt->bindValue(':passenger_id', $passenger_id);
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        throw new Exception('Booking not found or access denied');
    }
    
    $original_booking = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Check if new flight is available
    $query = "SELECT f.* FROM flights f WHERE f.id = :flight_id AND f.is_active = 1 AND f.available_seats > 0";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':flight_id', $data->new_flight_id);
    $stmt->execute();

    $new_flight = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$new_flight) {
        throw new Exception('New flight not found or not available');
    }

    // Determine seat to assign: prefer provided seat, otherwise auto-assign first free seat
    $assigned_seat = $data->new_seat_number ?? null;
    if ($assigned_seat) {
        $seatCheckQuery = "SELECT * FROM seat_assignments WHERE flight_id = :flight_id AND seat_number = :seat_number AND is_occupied = 0";
        $seatStmt = $db->prepare($seatCheckQuery);
        $seatStmt->bindValue(':flight_id', $data->new_flight_id);
        $seatStmt->bindValue(':seat_number', $assigned_seat);
        $seatStmt->execute();
        if ($seatStmt->rowCount() == 0) {
            throw new Exception('Selected seat is not available');
        }
    } else {
        $seatFindQuery = "SELECT seat_number FROM seat_assignments WHERE flight_id = :flight_id AND is_occupied = 0 LIMIT 1";
        $seatStmt = $db->prepare($seatFindQuery);
        $seatStmt->bindValue(':flight_id', $data->new_flight_id);
        $seatStmt->execute();
        $seatRow = $seatStmt->fetch(PDO::FETCH_ASSOC);
        if (!$seatRow) {
            throw new Exception('No available seats on the selected flight');
        }
        $assigned_seat = $seatRow['seat_number'];
    }

    // Calculate new price with day multiplier
    $day_multiplier = getDayMultiplier($new_flight['day_of_week']);
    $new_price = $new_flight['price'] * $day_multiplier;
    $rebooking_fee = 25;
    $total_price = $new_price + $rebooking_fee;

    // Update the existing booking in-place so the site reflects changes immediately
    $query = "UPDATE bookings SET 
                flight_id = :new_flight_id, 
                seat_number = :seat_number, 
                travel_date = :travel_date, 
                price = :price, 
                status = 'delayed', 
                delay_reason = :delay_reason, 
                rebooking_fee = :rebooking_fee, 
                updated_at = NOW()
              WHERE id = :booking_id";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':new_flight_id', $data->new_flight_id);
    $stmt->bindValue(':seat_number', $assigned_seat);
    $stmt->bindValue(':travel_date', $data->new_travel_date ?? $original_booking['travel_date']);
    $stmt->bindValue(':price', $total_price);
    $stmt->bindValue(':delay_reason', $data->delay_reason ?? null);
    $stmt->bindValue(':rebooking_fee', $rebooking_fee);
    $stmt->bindValue(':booking_id', $data->booking_id);
    $stmt->execute();

    // Update seat assignments
    // Free old seat(s) that referenced this booking
    $query = "UPDATE seat_assignments 
              SET is_occupied = 0, booking_id = NULL, occupied_at = NULL 
              WHERE booking_id = :old_booking_id";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':old_booking_id', $data->booking_id);
    $stmt->execute();

    // Occupy new seat for the same booking id
    $query = "UPDATE seat_assignments 
              SET is_occupied = 1, booking_id = :booking_id, occupied_at = NOW() 
              WHERE flight_id = :flight_id AND seat_number = :seat_number";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':booking_id', $data->booking_id);
    $stmt->bindValue(':flight_id', $data->new_flight_id);
    $stmt->bindValue(':seat_number', $assigned_seat);
    $stmt->execute();

    // Update flight available seats only if flight changed
    if ($original_booking['flight_id'] != $data->new_flight_id) {
        // Increase seats on old flight
        $query = "UPDATE flights SET available_seats = available_seats + 1 WHERE id = :old_flight_id";
        $stmt = $db->prepare($query);
        $stmt->bindValue(':old_flight_id', $original_booking['flight_id']);
        $stmt->execute();

        // Decrease seats on new flight
        $query = "UPDATE flights SET available_seats = available_seats - 1 WHERE id = :new_flight_id";
        $stmt = $db->prepare($query);
        $stmt->bindValue(':new_flight_id', $data->new_flight_id);
        $stmt->execute();
    }

    // Commit transaction
    $db->commit();

    $response = [
        'booking_id' => $data->booking_id,
        'booking_reference' => $original_booking['booking_reference'],
        'new_flight_number' => $new_flight['flight_number'],
        'new_seat_number' => $assigned_seat,
        'new_price' => $total_price,
        'original_price' => $original_booking['price'],
        'rebooking_fee' => $rebooking_fee,
        'delay_surcharge' => $new_price - $new_flight['price']
    ];

    jsonResponse(true, 'Booking delayed successfully', $response);
    
} catch (Exception $e) {
    // Rollback transaction on error
    $db->rollBack();
    jsonResponse(false, $e->getMessage(), [], 500);
}
?>