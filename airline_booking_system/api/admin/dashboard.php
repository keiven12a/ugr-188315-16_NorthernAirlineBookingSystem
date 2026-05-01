<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

// Get dashboard statistics
$stats = [];

// Total flights
$query = "SELECT COUNT(*) as total FROM flights WHERE is_active = 1";
$stmt = $db->query($query);
$stats['total_flights'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Total passengers
$query = "SELECT COUNT(*) as total FROM passengers";
$stmt = $db->query($query);
$stats['total_passengers'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Total bookings
$query = "SELECT COUNT(*) as total FROM bookings";
$stmt = $db->query($query);
$stats['total_bookings'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Today's bookings
$query = "SELECT COUNT(*) as total FROM bookings WHERE DATE(created_at) = CURDATE()";
$stmt = $db->query($query);
$stats['today_bookings'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Total revenue
$query = "SELECT SUM(price) as total FROM bookings WHERE status != 'cancelled'";
$stmt = $db->query($query);
$stats['total_revenue'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

// Available seats
$query = "SELECT SUM(available_seats) as total FROM flights WHERE is_active = 1";
$stmt = $db->query($query);
$stats['available_seats'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

// Booking status breakdown
$query = "SELECT status, COUNT(*) as count FROM bookings GROUP BY status";
$stmt = $db->query($query);
$status_breakdown = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $status_breakdown[$row['status']] = $row['count'];
}
$stats['status_breakdown'] = $status_breakdown;

// Recent bookings (last 10)
$query = "SELECT b.*, f.flight_number, p.name as passenger_name 
          FROM bookings b
          JOIN flights f ON b.flight_id = f.id
          JOIN passengers p ON b.passenger_id = p.id
          ORDER BY b.created_at DESC LIMIT 10";
$stmt = $db->query($query);
$recent_bookings = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $recent_bookings[] = $row;
}
$stats['recent_bookings'] = $recent_bookings;

jsonResponse(true, 'Dashboard statistics retrieved', $stats);
?>