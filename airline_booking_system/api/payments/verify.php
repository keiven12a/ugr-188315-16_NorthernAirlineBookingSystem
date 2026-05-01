<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

$database = new Database();
$db = $database->getConnection();

$transaction_id = $_GET['transaction_id'] ?? null;
$booking_id = $_GET['booking_id'] ?? null;

if (!$transaction_id && !$booking_id) {
    jsonResponse(false, 'Transaction ID or Booking ID is required', [], 400);
}

if ($transaction_id) {
    $query = "SELECT p.*, b.booking_reference, f.flight_number
              FROM payments p
              JOIN bookings b ON p.booking_id = b.id
              JOIN flights f ON b.flight_id = f.id
              WHERE p.transaction_id = :transaction_id";
              
    $stmt = $db->prepare($query);
    $stmt->bindParam(':transaction_id', $transaction_id);
} else {
    $query = "SELECT p.*, b.booking_reference, f.flight_number
              FROM payments p
              JOIN bookings b ON p.booking_id = b.id
              JOIN flights f ON b.flight_id = f.id
              WHERE p.booking_id = :booking_id
              ORDER BY p.created_at DESC LIMIT 1";
              
    $stmt = $db->prepare($query);
    $stmt->bindParam(':booking_id', $booking_id);
}

$stmt->execute();

if ($stmt->rowCount() == 0) {
    jsonResponse(false, 'Payment not found', [], 404);
}

$payment = $stmt->fetch(PDO::FETCH_ASSOC);

jsonResponse(true, 'Payment verification successful', $payment);
?>