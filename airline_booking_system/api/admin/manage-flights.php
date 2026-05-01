<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

// Only require admin for management actions. Allow passengers to fetch seat maps.
$action = $_GET['action'] ?? 'list';
if ($action !== 'seats') {
    requireAdminLogin();
} else {
    // Seat map should be accessible to authenticated passengers (not only admins)
    // If you want the seat map public, you can remove the next line.
    requirePassengerLogin();
}

$database = new Database();
$db = $database->getConnection();

switch ($action) {
    case 'list':
        // List all flights with details
        $query = "SELECT f.*, 
                  (SELECT COUNT(*) FROM bookings b 
                   WHERE b.flight_id = f.id AND b.status != 'cancelled') as confirmed_bookings,
                  (SELECT GROUP_CONCAT(seat_number SEPARATOR ', ') 
                   FROM seat_assignments sa 
                   WHERE sa.flight_id = f.id AND sa.is_occupied = 1 
                   LIMIT 10) as occupied_seats_sample
                  FROM flights f
                  ORDER BY f.created_at DESC";
                  
        $stmt = $db->query($query);
        $flights = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $flights[] = $row;
        }
        jsonResponse(true, 'Flights retrieved', $flights);
        break;
        
    case 'seats':
        // Get seat map for a specific flight
        $flight_id = $_GET['flight_id'] ?? null;
        if (!$flight_id) {
            jsonResponse(false, 'Flight ID is required', [], 400);
        }
        
                $query = "SELECT sa.seat_number, sa.is_occupied, 
                                                 p.name as passenger_name, b.booking_reference
                                    FROM seat_assignments sa
                                    LEFT JOIN bookings b ON sa.booking_id = b.id
                                    LEFT JOIN passengers p ON b.passenger_id = p.id
                                    WHERE sa.flight_id = :flight_id
                                    ORDER BY 
                                        CAST(SUBSTRING(sa.seat_number, 1, LENGTH(sa.seat_number)-1) AS UNSIGNED),
                                        RIGHT(sa.seat_number, 1)";
                  
        $stmt = $db->prepare($query);
        $stmt->bindParam(':flight_id', $flight_id);
        $stmt->execute();
        
        $seats = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $seats[] = $row;
        }
        jsonResponse(true, 'Seat map retrieved', $seats);
        break;
        
    default:
        jsonResponse(false, 'Invalid action', [], 400);
}
?>