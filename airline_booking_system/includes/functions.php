<?php
// Common utility functions

function generateBookingReference() {
    $prefix = 'ET';
    $random = strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
    return $prefix . '-' . $random;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function validatePassword($password) {
    // Minimum 8 characters, at least 1 letter and 1 number
    return preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/', $password);
}

function validatePassport($passport) {
    // 13-19 digits
    return preg_match('/^\d{13,19}$/', $passport);
}

function calculateRefund($bookingDate, $price, $cancellationDate = null) {
    if (!$cancellationDate) {
        $cancellationDate = new DateTime();
    } else {
        $cancellationDate = new DateTime($cancellationDate);
    }
    
    $bookingDate = new DateTime($bookingDate);
    $hoursDifference = ($cancellationDate->getTimestamp() - $bookingDate->getTimestamp()) / 3600;
    
    if ($hoursDifference <= 24) {
        return $price * 0.9; // 90% refund
    } elseif ($hoursDifference <= 48) {
        return $price * 0.75; // 75% refund
    } else {
        return $price * 0.5; // 50% refund
    }
}

function getDayMultiplier($day) {
    $multipliers = [
        'monday' => 1.0,
        'tuesday' => 1.1,
        'wednesday' => 1.2,
        'thursday' => 1.15,
        'friday' => 1.25,
        'saturday' => 1.3,
        'sunday' => 1.35
    ];
    
    $dayLower = strtolower($day);
    return $multipliers[$dayLower] ?? 1.0;
}

function jsonResponse($success, $message = '', $data = [], $statusCode = 200) {
    // Clean any unexpected output so client receives only valid JSON
    $existing = '';
    while (ob_get_level() > 0) {
        $existingPart = ob_get_clean();
        if ($existingPart !== false) $existing .= $existingPart;
    }
    if (!empty($existing)) {
        error_log("Cleared unexpected output before JSON response: " . substr($existing, 0, 2000));
    }

    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}
?>