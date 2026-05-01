<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

$database = new Database();
$db = $database->getConnection();

// Check if requesting specific booking or all
$booking_id = $_GET['id'] ?? null;
$reference = $_GET['reference'] ?? null;

if ($booking_id) {
    // Get specific booking
    $query = "SELECT b.*, f.flight_number, f.source, f.destination, 
                     f.departure_time, f.day_of_week,
                     p.name as passenger_name, p.email as passenger_email
              FROM bookings b
              JOIN flights f ON b.flight_id = f.id
              JOIN passengers p ON b.passenger_id = p.id
              WHERE b.id = :booking_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':booking_id', $booking_id);
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        jsonResponse(false, 'Booking not found', [], 404);
    }
    
    $booking = $stmt->fetch(PDO::FETCH_ASSOC);
    jsonResponse(true, 'Booking retrieved successfully', $booking);
    
} elseif ($reference) {
    // Get booking by reference
    $query = "SELECT b.*, f.flight_number, f.source, f.destination, 
                     f.departure_time, f.day_of_week,
                     p.name as passenger_name, p.email as passenger_email
              FROM bookings b
              JOIN flights f ON b.flight_id = f.id
              JOIN passengers p ON b.passenger_id = p.id
              WHERE b.booking_reference = :reference";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':reference', $reference);
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        jsonResponse(false, 'Booking not found', [], 404);
    }
    
    $booking = $stmt->fetch(PDO::FETCH_ASSOC);
    jsonResponse(true, 'Booking retrieved successfully', $booking);
    
} else {
    // Get all bookings (for admin) or user bookings (for passenger)
    if (isAdminLoggedIn()) {
        // Admin sees all bookings
        $query = "SELECT b.*, f.flight_number, f.source, f.destination, 
                         f.departure_time, p.name as passenger_name
                  FROM bookings b
                  JOIN flights f ON b.flight_id = f.id
                  JOIN passengers p ON b.passenger_id = p.id
                  ORDER BY b.created_at DESC";
                  
        $stmt = $db->prepare($query);
        
    } elseif (isPassengerLoggedIn()) {
        // Passenger sees only their bookings
        $passenger_id = getCurrentUserId();
        
        $query = "SELECT b.*, f.flight_number, f.source, f.destination, 
                         f.departure_time, f.day_of_week
                  FROM bookings b
                  JOIN flights f ON b.flight_id = f.id
                  WHERE b.passenger_id = :passenger_id
                  ORDER BY b.travel_date DESC, b.created_at DESC";
                  
        $stmt = $db->prepare($query);
        $stmt->bindParam(':passenger_id', $passenger_id);
    } else {
        jsonResponse(false, 'Authentication required', [], 401);
    }
    
    $stmt->execute();
    
    $bookings = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $bookings[] = $row;
    }
    
    jsonResponse(true, 'Bookings retrieved successfully', $bookings);
}
?>