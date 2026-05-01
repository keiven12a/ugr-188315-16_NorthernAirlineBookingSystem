<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$data = json_decode(file_get_contents("php://input"));

// normalize flight id into a local variable to avoid bindParam reference issues
$flight_id = isset($data->flight_id) ? (int)$data->flight_id : 0;

if (empty($flight_id)) {
    jsonResponse(false, 'Flight ID is required', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Check if flight has bookings
$query = "SELECT COUNT(*) as booking_count FROM bookings WHERE flight_id = :flight_id AND status != 'cancelled'";
$stmt = $db->prepare($query);
$stmt->bindValue(':flight_id', $flight_id, PDO::PARAM_INT);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result['booking_count'] > 0) {
    jsonResponse(false, 'Cannot delete flight with active bookings', [], 400);
}

// Delete seat assignments first
$query = "DELETE FROM seat_assignments WHERE flight_id = :flight_id";
$stmt = $db->prepare($query);
$stmt->bindValue(':flight_id', $flight_id, PDO::PARAM_INT);
$stmt->execute();

// Delete flight
 $query = "DELETE FROM flights WHERE id = :flight_id";
 $stmt = $db->prepare($query);
 $stmt->bindValue(':flight_id', $flight_id, PDO::PARAM_INT);

if ($stmt->execute()) {
    jsonResponse(true, 'Flight deleted successfully');
} else {
    jsonResponse(false, 'Failed to delete flight', [], 500);
}
?>