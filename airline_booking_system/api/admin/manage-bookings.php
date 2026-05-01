<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

$database = new Database();
$db = $database->getConnection();

// Accept action from GET, POST form, or JSON payload to be more flexible
$rawInput = file_get_contents("php://input");
$jsonData = json_decode($rawInput);
$action = $_GET['action'] ?? $_POST['action'] ?? ($jsonData->action ?? 'list');

// Admin authentication: prefer session, but allow admin_id fallback for non-cookie clients
$admin_id = getCurrentAdminId();
if (empty($admin_id)) {
    $admin_id = $_GET['admin_id'] ?? $_POST['admin_id'] ?? ($jsonData->admin_id ?? null);
}
if (empty($admin_id)) {
    jsonResponse(false, 'Admin authentication required.', [], 401);
}

// Debug log for admin manage-bookings
file_put_contents(__DIR__ . '/manage_bookings_debug.log', "[".date('c')."] INPUT: ".substr($rawInput,0,2000)."\nADMIN_ID: ".$admin_id."\nSESSION: ".json_encode(array_intersect_key($_SESSION, array('admin_id'=>1)))."\n\n", FILE_APPEND);

switch ($action) {
    case 'list':
        $status = $_GET['status'] ?? $_POST['status'] ?? ($jsonData->status ?? null);
        $flight_id = $_GET['flight_id'] ?? $_POST['flight_id'] ?? ($jsonData->flight_id ?? null);
        $date = $_GET['date'] ?? $_POST['date'] ?? ($jsonData->date ?? null);
        
        $query = "SELECT b.*, f.flight_number, f.source, f.destination, 
                         f.departure_time, p.name as passenger_name, 
                         p.email as passenger_email, p.passport_number
                  FROM bookings b
                  JOIN flights f ON b.flight_id = f.id
                  JOIN passengers p ON b.passenger_id = p.id
                  WHERE 1=1";
                  
        $params = [];
        
        if ($status) {
            $query .= " AND b.status = :status";
            $params[':status'] = $status;
        }
        
        if ($flight_id) {
            $query .= " AND b.flight_id = :flight_id";
            $params[':flight_id'] = $flight_id;
        }
        
        if ($date) {
            $query .= " AND DATE(b.travel_date) = :date";
            $params[':date'] = $date;
        }
        
        $query .= " ORDER BY b.travel_date DESC, b.created_at DESC";
        
        $stmt = $db->prepare($query);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->execute();
        
        $bookings = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $bookings[] = $row;
        }
        jsonResponse(true, 'Bookings retrieved', $bookings);
        break;
        
    case 'update':
        $data = json_decode(file_get_contents("php://input"));
        
        if (empty($data->booking_id)) {
            jsonResponse(false, 'Booking ID is required', [], 400);
        }
        
        $updates = [];
        $params = [':booking_id' => $data->booking_id];
        
        if (isset($data->status)) {
            $updates[] = "status = :status";
            $params[':status'] = $data->status;
            
            if ($data->status == 'cancelled') {
                $updates[] = "cancellation_date = NOW()";
            }
        }
        
        if (isset($data->seat_number)) {
            $updates[] = "seat_number = :seat_number";
            $params[':seat_number'] = $data->seat_number;
        }
        
        if (isset($data->price)) {
            $updates[] = "price = :price";
            $params[':price'] = $data->price;
        }
        
        if (empty($updates)) {
            jsonResponse(false, 'No updates provided', [], 400);
        }
        
        $query = "UPDATE bookings SET " . implode(', ', $updates) . 
                 " WHERE id = :booking_id";
        
        $stmt = $db->prepare($query);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        if ($stmt->execute()) {
            jsonResponse(true, 'Booking updated successfully');
        } else {
            jsonResponse(false, 'Failed to update booking', [], 500);
        }
        break;
        
    default:
        jsonResponse(false, 'Invalid action', [], 400);
}
?>