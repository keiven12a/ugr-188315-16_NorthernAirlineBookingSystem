<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';


requirePassengerLogin();

$raw = file_get_contents("php://input");
$data = json_decode($raw);

// Debug log incoming requests for troubleshooting
file_put_contents(__DIR__ . '/cancel_debug.log', "[".date('c')."] INPUT: ".substr($raw,0,2000)."\nSESSION: ".json_encode(array_intersect_key($_SESSION, array('user_id'=>1,'admin_id'=>1)))."\n\n", FILE_APPEND);

if (empty($data->booking_id)) {
    jsonResponse(false, 'Booking ID is required', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Begin transaction
$db->beginTransaction();

try {
    // Get booking details
    $passenger_id = getCurrentUserId();
    // Allow fallback passenger_id in request for debugging or non-cookie clients
    if (empty($passenger_id) && !empty($data->passenger_id)) {
        $passenger_id = $data->passenger_id;
    }
    
    $query = "SELECT b.*, f.price as flight_price
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
    
    $booking = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Check if booking is already cancelled
    if ($booking['status'] == 'cancelled') {
        throw new Exception('Booking is already cancelled');
    }

    // Calculate refund - prefer booking price, fall back to flight price
    $booking_price = $booking['price'] ?? $booking['flight_price'] ?? 0;
    $refund_amount = calculateRefund($booking['booking_date'], $booking_price);
    
    // Update booking status
    $query = "UPDATE bookings 
              SET status = 'cancelled', 
                  cancellation_date = NOW(),
                  refund_amount = :refund_amount
              WHERE id = :booking_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindValue(':booking_id', $data->booking_id);
    $stmt->bindValue(':refund_amount', $refund_amount);
    $stmt->execute();
    
    // Free up seat
    $query = "UPDATE seat_assignments 
              SET is_occupied = 0, booking_id = NULL, occupied_at = NULL 
              WHERE booking_id = :booking_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindValue(':booking_id', $data->booking_id);
    $stmt->execute();
    
    // Update flight available seats
    $query = "UPDATE flights 
              SET available_seats = available_seats + 1 
              WHERE id = :flight_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindValue(':flight_id', $booking['flight_id']);
    $stmt->execute();
    
    // Commit transaction
    $db->commit();
    
    $response = [
        'booking_id' => $data->booking_id,
        'refund_amount' => $refund_amount,
        'original_price' => $booking_price,
        'cancellation_date' => date('Y-m-d H:i:s')
    ];
    
    jsonResponse(true, 'Booking cancelled successfully', $response);
    
} catch (Exception $e) {
    // Rollback transaction on error
    $db->rollBack();
    jsonResponse(false, $e->getMessage(), [], 500);
}
?>