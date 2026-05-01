<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get search parameters
$source = $_GET['from'] ?? '';
$destination = $_GET['to'] ?? '';
$date = $_GET['date'] ?? ''; // Expected format: YYYY-MM-DD
$passengers = $_GET['passengers'] ?? 1;

// Convert date to day of week
$day_of_week = '';
if (!empty($date)) {
    $timestamp = strtotime($date);
    $day_of_week = date('l', $timestamp); // Returns full day name (Monday, Tuesday, etc.)
}

// Build query
$query = "SELECT f.*, 
          (SELECT COUNT(*) FROM seat_assignments sa 
           WHERE sa.flight_id = f.id AND sa.is_occupied = 0) as available_seats_count
          FROM flights f
          WHERE f.is_active = 1 
          AND f.available_seats >= :passengers";

$params = [':passengers' => $passengers];

if (!empty($source)) {
    $query .= " AND f.source LIKE :source";
    $params[':source'] = "%$source%";
}

if (!empty($destination)) {
    $query .= " AND f.destination LIKE :destination";
    $params[':destination'] = "%$destination%";
}

if (!empty($day_of_week)) {
    $query .= " AND f.day_of_week = :day_of_week";
    $params[':day_of_week'] = $day_of_week;
}

$query .= " ORDER BY f.departure_time ASC";

$stmt = $db->prepare($query);

foreach ($params as $key => $value) {
    $stmt->bindValue($key, $value);
}

$stmt->execute();

$flights = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Get available seats
    $seat_query = "SELECT seat_number FROM seat_assignments 
                   WHERE flight_id = :flight_id AND is_occupied = 0 
                   ORDER BY seat_number";
    $seat_stmt = $db->prepare($seat_query);
    $seat_stmt->bindParam(':flight_id', $row['id']);
    $seat_stmt->execute();
    
    $available_seats = [];
    while ($seat = $seat_stmt->fetch(PDO::FETCH_ASSOC)) {
        $available_seats[] = $seat['seat_number'];
    }
    
    $row['available_seats_list'] = $available_seats;
    $flights[] = $row;
}

jsonResponse(true, 'Search results retrieved', $flights);
?>