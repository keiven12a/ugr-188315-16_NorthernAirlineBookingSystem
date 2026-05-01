<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requirePassengerLogin();

// Debug: log incoming request body to help diagnose payment issues
$raw = file_get_contents("php://input");
file_put_contents(__DIR__ . '/process_debug.log', "[" . date('Y-m-d H:i:s') . "] RAW: " . substr($raw,0,2000) . "\n", FILE_APPEND);

$data = json_decode($raw);

if (empty($data->booking_id) || empty($data->payment_method)) {
    jsonResponse(false, 'Missing required fields', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Get booking details
$passenger_id = getCurrentUserId();

$query = "SELECT b.*, f.flight_number
          FROM bookings b
          JOIN flights f ON b.flight_id = f.id
          WHERE b.id = :booking_id AND b.passenger_id = :passenger_id";
          
$stmt = $db->prepare($query);
$stmt->bindParam(':booking_id', $data->booking_id);
$stmt->bindParam(':passenger_id', $passenger_id);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    jsonResponse(false, 'Booking not found', [], 404);
}

$booking = $stmt->fetch(PDO::FETCH_ASSOC);

// Check if booking is already paid
if ($booking['payment_status'] == 'completed') {
    jsonResponse(false, 'Booking is already paid', [], 400);
}

// Generate transaction ID
$transaction_id = 'TXN' . strtoupper(uniqid());

// Process payment based on method
$payment_status = 'completed'; // Simulated - in real app, integrate with payment gateway
$payment_details = json_encode([
    'method' => $data->payment_method,
    'transaction_id' => $transaction_id,
    'timestamp' => date('Y-m-d H:i:s'),
    'card_last4' => $data->card_last4 ?? null,
    'mobile_number' => $data->mobile_number ?? null
]);

// Begin transaction
$db->beginTransaction();

try {
    // Update booking payment status
    $query = "UPDATE bookings 
              SET payment_method = :payment_method,
                  payment_status = :payment_status
              WHERE id = :booking_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':payment_method', $data->payment_method);
    $stmt->bindParam(':payment_status', $payment_status);
    $stmt->bindParam(':booking_id', $data->booking_id);
    $stmt->execute();
    
    // Record payment
    $query = "INSERT INTO payments 
              (booking_id, payment_method, transaction_id, 
               amount, status, payment_details) 
              VALUES 
              (:booking_id, :payment_method, :transaction_id,
               :amount, :status, :payment_details)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':booking_id', $data->booking_id);
    $stmt->bindParam(':payment_method', $data->payment_method);
    $stmt->bindParam(':transaction_id', $transaction_id);
    $stmt->bindParam(':amount', $booking['price']);
    $stmt->bindParam(':status', $payment_status);
    $stmt->bindParam(':payment_details', $payment_details);
    $stmt->execute();
    
    $payment_id = $db->lastInsertId();
    
    // Commit transaction
    $db->commit();
    
    $response = [
        'payment_id' => $payment_id,
        'transaction_id' => $transaction_id,
        'booking_id' => $data->booking_id,
        'amount' => $booking['price'],
        'payment_method' => $data->payment_method,
        'status' => $payment_status,
        'flight_number' => $booking['flight_number']
    ];
    
    jsonResponse(true, 'Payment processed successfully', $response);
    
} catch (Exception $e) {
    // Rollback transaction on error
    $db->rollBack();
    // Log exception details
    $logEntry = "[" . date('Y-m-d H:i:s') . "] Payment error: " . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
    file_put_contents(__DIR__ . '/process_debug.log', $logEntry, FILE_APPEND);
    jsonResponse(false, 'Payment processing failed: ' . $e->getMessage(), [], 500);
}
?>