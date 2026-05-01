<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requirePassengerLogin();

$database = new Database();
$db = $database->getConnection();

$user_id = getCurrentUserId();

// Get passenger profile
$query = "SELECT id, name, username, gender, age, email, passport_number, created_at 
          FROM passengers WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $user_id);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    jsonResponse(false, 'User not found', [], 404);
}

$profile = $stmt->fetch(PDO::FETCH_ASSOC);

// Get booking count
$query = "SELECT COUNT(*) as booking_count FROM bookings WHERE passenger_id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $user_id);
$stmt->execute();
$booking_count = $stmt->fetch(PDO::FETCH_ASSOC)['booking_count'];

$profile['booking_count'] = $booking_count;

jsonResponse(true, 'Profile retrieved successfully', $profile);
?>