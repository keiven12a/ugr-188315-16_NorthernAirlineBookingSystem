<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requirePassengerLogin();

$database = new Database();
$db = $database->getConnection();

$passenger_id = getCurrentUserId();
$status = $_GET['status'] ?? null;

// Build query
$query = "SELECT b.*, f.flight_number, f.source, f.destination, 
                 f.departure_time, f.day_of_week, f.price as flight_price,
                 (SELECT COUNT(*) FROM bookings b2 
                  WHERE b2.original_booking_id = b.id) as has_delayed_version
          FROM bookings b
          JOIN flights f ON b.flight_id = f.id
          WHERE b.passenger_id = :passenger_id";
          
$params = [':passenger_id' => $passenger_id];

if ($status) {
    $query .= " AND b.status = :status";
    $params[':status'] = $status;
}

$query .= " ORDER BY 
            CASE b.status 
                WHEN 'confirmed' THEN 1
                WHEN 'delayed' THEN 2
                WHEN 'cancelled' THEN 3
                ELSE 4
            END,
            b.travel_date DESC";

$stmt = $db->prepare($query);

foreach ($params as $key => $value) {
    $stmt->bindValue($key, $value);
}

$stmt->execute();

$bookings = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Add additional info based on status
    if ($row['status'] == 'cancelled' && $row['refund_amount']) {
        $row['refund_percentage'] = round(($row['refund_amount'] / $row['price']) * 100);
    }
    
    $bookings[] = $row;
}

jsonResponse(true, 'Your bookings retrieved successfully', $bookings);
?>