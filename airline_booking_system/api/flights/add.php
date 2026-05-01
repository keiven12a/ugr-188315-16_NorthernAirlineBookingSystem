<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$data = json_decode(file_get_contents("php://input"));

// Validate required fields
$required = ['flight_number', 'source', 'destination', 'departure_time', 'day_of_week', 'price'];
foreach ($required as $field) {
    if (empty($data->$field)) {
        jsonResponse(false, "Missing required field: $field", [], 400);
    }
}

$database = new Database();
$db = $database->getConnection();

// Check if flight number already exists
$query = "SELECT id FROM flights WHERE flight_number = :flight_number";
$stmt = $db->prepare($query);
$stmt->bindParam(':flight_number', $data->flight_number);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    jsonResponse(false, 'Flight number already exists', [], 409);
}

// Insert new flight
$query = "INSERT INTO flights 
          (flight_number, source, destination, departure_time, arrival_time, 
           day_of_week, total_seats, available_seats, price) 
          VALUES 
          (:flight_number, :source, :destination, :departure_time, :arrival_time,
           :day_of_week, :total_seats, :available_seats, :price)";

$stmt = $db->prepare($query);

// Calculate arrival time (add 2 hours to departure as default)
$departure_time = $data->departure_time;
$arrival_time = date('H:i', strtotime($departure_time . ' +2 hours'));
$total_seats = $data->total_seats ?? 150;
$available_seats = $data->available_seats ?? $total_seats;

$stmt->bindParam(':flight_number', $data->flight_number);
$stmt->bindParam(':source', $data->source);
$stmt->bindParam(':destination', $data->destination);
$stmt->bindParam(':departure_time', $departure_time);
$stmt->bindParam(':arrival_time', $arrival_time);
$stmt->bindParam(':day_of_week', $data->day_of_week);
$stmt->bindParam(':total_seats', $total_seats);
$stmt->bindParam(':available_seats', $available_seats);
$stmt->bindParam(':price', $data->price);

if ($stmt->execute()) {
    $flight_id = $db->lastInsertId();
    
    // Create seat assignments
    createSeatAssignments($db, $flight_id, $total_seats);
    
    jsonResponse(true, 'Flight added successfully', ['flight_id' => $flight_id]);
} else {
    jsonResponse(false, 'Failed to add flight', [], 500);
}

function createSeatAssignments($db, $flight_id, $total_seats) {
    $rows = ceil($total_seats / 6); // 6 seats per row (A-F)
    $seat_letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    $query = "INSERT INTO seat_assignments (flight_id, seat_number) VALUES (:flight_id, :seat_number)";
    $stmt = $db->prepare($query);
    
    for ($row = 1; $row <= $rows; $row++) {
        foreach ($seat_letters as $letter) {
            $seat_number = $row . $letter;
            $stmt->bindParam(':flight_id', $flight_id);
            $stmt->bindParam(':seat_number', $seat_number);
            $stmt->execute();
        }
    }
}
?>