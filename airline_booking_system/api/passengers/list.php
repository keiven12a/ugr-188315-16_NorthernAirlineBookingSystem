<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, name, username, gender, age, email, passport_number, created_at 
          FROM passengers 
          ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();

$passengers = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $passengers[] = $row;
}

jsonResponse(true, 'Passengers retrieved successfully', $passengers);
?>