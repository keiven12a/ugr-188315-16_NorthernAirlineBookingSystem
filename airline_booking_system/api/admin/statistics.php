<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

// Get time period from query parameters
$period = $_GET['period'] ?? 'month'; // day, week, month, year
$start_date = $_GET['start'] ?? null;
$end_date = $_GET['end'] ?? null;

// Set date range based on period
if (!$start_date || !$end_date) {
    switch ($period) {
        case 'day':
            $start_date = date('Y-m-d');
            $end_date = date('Y-m-d');
            break;
        case 'week':
            $start_date = date('Y-m-d', strtotime('-7 days'));
            $end_date = date('Y-m-d');
            break;
        case 'month':
            $start_date = date('Y-m-01');
            $end_date = date('Y-m-t');
            break;
        case 'year':
            $start_date = date('Y-01-01');
            $end_date = date('Y-12-31');
            break;
        default:
            $start_date = date('Y-m-01');
            $end_date = date('Y-m-t');
    }
}

$stats = [];

// Daily booking trends
$query = "SELECT DATE(created_at) as date, COUNT(*) as bookings, SUM(price) as revenue
          FROM bookings 
          WHERE created_at BETWEEN :start_date AND :end_date
          AND status != 'cancelled'
          GROUP BY DATE(created_at)
          ORDER BY date";
          
$stmt = $db->prepare($query);
$stmt->bindParam(':start_date', $start_date);
$stmt->bindParam(':end_date', $end_date);
$stmt->execute();

$daily_trends = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $daily_trends[] = $row;
}
$stats['daily_trends'] = $daily_trends;

// Flight performance
$query = "SELECT f.flight_number, f.source, f.destination,
                 COUNT(b.id) as total_bookings,
                 SUM(b.price) as total_revenue,
                 AVG(CASE WHEN b.status != 'cancelled' THEN b.price ELSE NULL END) as avg_revenue
          FROM flights f
          LEFT JOIN bookings b ON f.id = b.flight_id
          WHERE f.is_active = 1
          GROUP BY f.id
          ORDER BY total_bookings DESC";
          
$stmt = $db->query($query);
$flight_performance = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $flight_performance[] = $row;
}
$stats['flight_performance'] = $flight_performance;

// Passenger demographics
$query = "SELECT 
            CASE 
                WHEN age < 18 THEN 'Under 18'
                WHEN age BETWEEN 18 AND 30 THEN '18-30'
                WHEN age BETWEEN 31 AND 50 THEN '31-50'
                WHEN age > 50 THEN 'Over 50'
            END as age_group,
            gender,
            COUNT(*) as count
          FROM passengers
          GROUP BY age_group, gender
          ORDER BY age_group, gender";
          
$stmt = $db->query($query);
$demographics = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $demographics[] = $row;
}
$stats['demographics'] = $demographics;

// Cancellation analysis
$query = "SELECT 
            DATE(cancellation_date) as date,
            COUNT(*) as cancellations,
            AVG(refund_amount) as avg_refund,
            SUM(refund_amount) as total_refund
          FROM bookings
          WHERE status = 'cancelled' 
          AND cancellation_date BETWEEN :start_date AND :end_date
          GROUP BY DATE(cancellation_date)
          ORDER BY date";
          
$stmt = $db->prepare($query);
$stmt->bindParam(':start_date', $start_date);
$stmt->bindParam(':end_date', $end_date);
$stmt->execute();

$cancellation_analysis = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $cancellation_analysis[] = $row;
}
$stats['cancellation_analysis'] = $cancellation_analysis;

jsonResponse(true, 'Statistics retrieved successfully', $stats);
?>