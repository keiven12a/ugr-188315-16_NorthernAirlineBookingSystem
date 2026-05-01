<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$data = json_decode(file_get_contents("php://input"));

if (empty($data->flight_id)) {
    jsonResponse(false, 'Flight ID is required', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Check if flight exists
$query = "SELECT id FROM flights WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $data->flight_id);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    jsonResponse(false, 'Flight not found', [], 404);
}

// Build update query
$updates = [];
$params = [':id' => $data->flight_id];

$fields = [
    'flight_number' => 'flight_number',
    'source' => 'source',
    'destination' => 'destination',
    'departure_time' => 'departure_time',
    'arrival_time' => 'arrival_time',
    'day_of_week' => 'day_of_week',
    'available_seats' => 'available_seats',
    'price' => 'price',
    'is_active' => 'is_active'
];

foreach ($fields as $property => $column) {
    if (isset($data->$property)) {
        $updates[] = "$column = :$column";
        $params[":$column"] = $data->$property;
    }
}

if (empty($updates)) {
    jsonResponse(false, 'No data to update', [], 400);
}

$query = "UPDATE flights SET " . implode(', ', $updates) . " WHERE id = :id";
$stmt = $db->prepare($query);

foreach ($params as $key => $value) {
    $stmt->bindValue($key, $value);
}

if ($stmt->execute()) {
    jsonResponse(true, 'Flight updated successfully');
} else {
    jsonResponse(false, 'Failed to update flight', [], 500);
}
?>