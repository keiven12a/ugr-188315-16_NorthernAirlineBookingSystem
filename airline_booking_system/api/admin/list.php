<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

requireAdminLogin();

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, username, full_name, role, created_at 
          FROM admins 
          ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();

$admins = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $admins[] = $row;
}

jsonResponse(true, 'Admins retrieved successfully', $admins);
?>