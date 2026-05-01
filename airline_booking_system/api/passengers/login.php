<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

// Get posted data (accept JSON or form-encoded)
$raw = file_get_contents("php://input");
$data = json_decode($raw);
if (empty($data) && !empty($_POST)) {
    $data = (object) $_POST;
}
if (empty($data) && !empty($raw)) {
    parse_str($raw, $parsed);
    if (!empty($parsed)) $data = (object) $parsed;
}

// Debug logging helper (appends to api/passengers/login_debug.log)
function log_login_debug($note, $raw, $data) {
    $file = __DIR__ . '/login_debug.log';
    $entry = "[" . date('Y-m-d H:i:s') . "] " . $note . "\n";
    $entry .= "RAW: " . substr($raw, 0, 1000) . "\n";
    $entry .= "PARSED: " . var_export($data, true) . "\n\n";
    file_put_contents($file, $entry, FILE_APPEND);
}

// Validate required fields
if (empty($data->username) || empty($data->password)) {
    jsonResponse(false, 'Username and password are required', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Find passenger
$query = "SELECT id, name, username, gender, age, email, passport_number, password 
          FROM passengers WHERE username = :username";
$stmt = $db->prepare($query);
$stmt->bindParam(':username', $data->username);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    log_login_debug('User not found', $raw, $data);
    jsonResponse(false, 'User not found', [], 404);
}

$passenger = $stmt->fetch(PDO::FETCH_ASSOC);

// Verify password
if (!verifyPassword($data->password, $passenger['password'])) {
    log_login_debug('Invalid password attempt', $raw, ['db_password_hash' => $passenger['password']]);
    jsonResponse(false, 'Invalid password', [], 401);
}

// Set session
$_SESSION['user_id'] = $passenger['id'];
$_SESSION['user_name'] = $passenger['name'];
$_SESSION['user_type'] = 'passenger';

// Remove password from response
unset($passenger['password']);

jsonResponse(true, 'Login successful', $passenger);
?>