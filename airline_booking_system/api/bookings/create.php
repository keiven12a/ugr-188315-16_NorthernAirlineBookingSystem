<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requirePassengerLogin();

$data = json_decode(file_get_contents("php://input"));

// Validate required fields
if (empty($data->flight_id) || empty($data->seat_number) || empty($data->travel_date)) {
    jsonResponse(false, 'Missing required fields', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Begin transaction
$db->beginTransaction();

try {
    // Check flight availability
    $query = "SELECT f.*, 
              (SELECT COUNT(*) FROM seat_assignments sa 
               WHERE sa.flight_id = f.id AND sa.seat_number = :seat_number AND sa.is_occupied = 0) 
              as seat_available
              FROM flights f 
              WHERE f.id = :flight_id AND f.is_active = 1 AND f.available_seats > 0";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':flight_id', $data->flight_id);
    $stmt->bindParam(':seat_number', $data->seat_number);
    $stmt->execute();
    
    $flight = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$flight) {
        throw new Exception('Flight not found or not active');
    }
    
    if ($flight['seat_available'] == 0) {
        throw new Exception('Selected seat is not available');
    }
    
    // Get passenger ID from session
    $passenger_id = getCurrentUserId();
    
    // Generate booking reference
    $booking_reference = generateBookingReference();
    
    // Get flight price
    $price = $flight['price'];
    
    // Create booking
    $query = "INSERT INTO bookings 
              (booking_reference, passenger_id, flight_id, seat_number, 
               booking_date, travel_date, price, status) 
              VALUES 
              (:booking_ref, :passenger_id, :flight_id, :seat_number,
               CURDATE(), :travel_date, :price, 'confirmed')";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':booking_ref', $booking_reference);
    $stmt->bindParam(':passenger_id', $passenger_id);
    $stmt->bindParam(':flight_id', $data->flight_id);
    $stmt->bindParam(':seat_number', $data->seat_number);
    $stmt->bindParam(':travel_date', $data->travel_date);
    $stmt->bindParam(':price', $price);
    $stmt->execute();
    
    $booking_id = $db->lastInsertId();
    
    // Update seat assignment
    $query = "UPDATE seat_assignments 
              SET is_occupied = 1, booking_id = :booking_id, occupied_at = NOW() 
              WHERE flight_id = :flight_id AND seat_number = :seat_number";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':booking_id', $booking_id);
    $stmt->bindParam(':flight_id', $data->flight_id);
    $stmt->bindParam(':seat_number', $data->seat_number);
    $stmt->execute();
    
    // Update flight available seats
    $query = "UPDATE flights 
              SET available_seats = available_seats - 1 
              WHERE id = :flight_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':flight_id', $data->flight_id);
    $stmt->execute();
    
    // Commit transaction
    $db->commit();
    
    $response = [
        'booking_id' => $booking_id,
        'booking_reference' => $booking_reference,
        'flight_number' => $flight['flight_number'],
        'source' => $flight['source'],
        'destination' => $flight['destination'],
        'departure_time' => $flight['departure_time'],
        'seat_number' => $data->seat_number,
        'travel_date' => $data->travel_date,
        'price' => $price
    ];
    
    jsonResponse(true, 'Booking created successfully', $response);
    
} catch (Exception $e) {
    // Rollback transaction on error
    $db->rollBack();
    jsonResponse(false, $e->getMessage(), [], 500);
}
?>