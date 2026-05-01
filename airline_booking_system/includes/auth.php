<?php
// Authentication and authorization functions

session_start();
// Start output buffering to prevent accidental output breaking JSON APIs
if (ob_get_level() === 0) ob_start();

function isLoggedIn() {
    return isset($_SESSION['user_id']) || isset($_SESSION['admin_id']);
}

function isPassengerLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdminLoggedIn() {
    return isset($_SESSION['admin_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        jsonResponse(false, 'Authentication required. Please login first.', [], 401);
    }
}

function requirePassengerLogin() {
    if (!isPassengerLoggedIn()) {
        jsonResponse(false, 'Passenger authentication required.', [], 401);
    }
}

function requireAdminLogin() {
    if (!isAdminLoggedIn()) {
        jsonResponse(false, 'Admin authentication required.', [], 401);
    }
}

function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

function getCurrentAdminId() {
    return $_SESSION['admin_id'] ?? null;
}

function logout() {
    session_destroy();
    jsonResponse(true, 'Logged out successfully');
}

// CORS headers - allow credentials and reflect origin when present
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>