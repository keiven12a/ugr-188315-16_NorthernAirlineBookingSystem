<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/functions.php';
require_once __DIR__ . '/../../api/config/database.php';

// Get posted data (accept JSON or form-encoded)
$raw = file_get_contents("php://input");
$data = json_decode($raw);
if (empty($data) && !empty($_POST)) {
    // Convert $_POST to an object for compatibility
    $data = (object) $_POST;
}

// If still empty, try to parse URL-encoded body
if (empty($data) && !empty($raw)) {
    parse_str($raw, $parsed);
    if (!empty($parsed)) $data = (object) $parsed;
}

// Debug logging helper (appends to api/passengers/register_debug.log)
function log_register_debug($note, $raw, $data) {
    $file = __DIR__ . '/register_debug.log';
    $entry = "[" . date('Y-m-d H:i:s') . "] " . $note . "\n";
    $entry .= "RAW: " . substr($raw, 0, 1000) . "\n";
    $entry .= "PARSED: " . var_export($data, true) . "\n\n";
    file_put_contents($file, $entry, FILE_APPEND);
}

// Validate required fields
if (
    empty($data->name) ||
    empty($data->username) ||
    empty($data->age) ||
    empty($data->passport_number) ||
    empty($data->password)
) {
    log_register_debug('Missing required fields', $raw, $data);
    jsonResponse(false, 'Missing required fields', [], 400);
}

// Validate passport number
if (!validatePassport($data->passport_number)) {
    log_register_debug('Invalid passport', $raw, $data);
    jsonResponse(false, 'Passport number must be 13-19 digits', [], 400);
}

// Validate password
if (!validatePassword($data->password)) {
    log_register_debug('Invalid password format', $raw, $data);
    jsonResponse(false, 'Password must be at least 8 characters with letters and numbers', [], 400);
}

// Validate email if provided
if (!empty($data->email) && !validateEmail($data->email)) {
    log_register_debug('Invalid email', $raw, $data);
    jsonResponse(false, 'Invalid email format', [], 400);
}

$database = new Database();
$db = $database->getConnection();

// Check if username already exists
$query = "SELECT id FROM passengers WHERE username = :username";
$stmt = $db->prepare($query);
$stmt->bindParam(':username', $data->username);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    jsonResponse(false, 'Username already exists', [], 409);
}

// Check if passport already exists
$query = "SELECT id FROM passengers WHERE passport_number = :passport";
$stmt = $db->prepare($query);
$stmt->bindParam(':passport', $data->passport_number);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    jsonResponse(false, 'Passport number already registered', [], 409);
}

// Insert new passenger
$query = "INSERT INTO passengers 
          (name, username, gender, age, email, passport_number, password) 
          VALUES 
          (:name, :username, :gender, :age, :email, :passport_number, :password)";

$stmt = $db->prepare($query);

// Sanitize and bind parameters
$name = sanitizeInput($data->name);
$username = sanitizeInput($data->username);
$gender = !empty($data->gender) ? sanitizeInput($data->gender) : NULL;
$age = (int)$data->age;
$email = !empty($data->email) ? sanitizeInput($data->email) : NULL;
$passport = sanitizeInput($data->passport_number);
$password = hashPassword($data->password);

$stmt->bindParam(':name', $name);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':gender', $gender);
$stmt->bindParam(':age', $age);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':passport_number', $passport);
$stmt->bindParam(':password', $password);

if ($stmt->execute()) {
    $passenger_id = $db->lastInsertId();
    
    // Return passenger info (excluding password)
    $response = [
        'id' => $passenger_id,
        'name' => $name,
        'username' => $username,
        'gender' => $gender,
        'age' => $age,
        'email' => $email,
        'passport_number' => $passport
    ];
    
    jsonResponse(true, 'Registration successful', $response);
} else {
    jsonResponse(false, 'Registration failed', [], 500);
}
?>