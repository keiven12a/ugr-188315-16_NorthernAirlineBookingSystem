<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get query parameters
$source = $_GET['source'] ?? '';
$destination = $_GET['destination'] ?? '';
$day = $_GET['day'] ?? '';
$available_only = isset($_GET['available']) ? $_GET['available'] : true;

// Build query
$query = "SELECT * FROM flights WHERE is_active = 1";
$params = [];

if (!empty($source)) {
    $query .= " AND source LIKE :source";
    $params[':source'] = "%$source%";
}

if (!empty($destination)) {
    $query .= " AND destination LIKE :destination";
    $params[':destination'] = "%$destination%";
}

if (!empty($day)) {
    $query .= " AND day_of_week = :day";
    $params[':day'] = $day;
}

if ($available_only) {
    $query .= " AND available_seats > 0";
}

$query .= " ORDER BY departure_time ASC";

$stmt = $db->prepare($query);

foreach ($params as $key => $value) {
    $stmt->bindValue($key, $value);
}

$stmt->execute();

$flights = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $flights[] = $row;
}

jsonResponse(true, 'Flights retrieved successfully', $flights);
?>