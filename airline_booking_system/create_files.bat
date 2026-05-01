@echo off
echo Creating Airline Booking System Backend Structure...

REM Create directories
mkdir api 2>nul
mkdir api\config 2>nul
mkdir api\passengers 2>nul
mkdir api\flights 2>nul
mkdir api\bookings 2>nul
mkdir api\admin 2>nul
mkdir api\payments 2>nul
mkdir includes 2>nul

echo Creating configuration files...

REM Create database.php
echo Creating api\config\database.php...
(
echo ^<?php
echo // Database configuration
echo class Database {
echo     private $host = "localhost";
echo     private $db_name = "airline_booking_system";
echo     private $username = "root";
echo     private $password = "";
echo     public $conn;
echo.
echo     // Get database connection
echo     public function getConnection() {
echo         $this->conn = null;
echo.
echo         try {
echo             $this->conn = new PDO(
echo                 "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
echo                 $this->username,
echo                 $this->password
echo             );
echo             $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
echo             $this->conn->exec("set names utf8");
echo         } catch(PDOException $exception) {
echo             echo "Connection error: " . $exception->getMessage();
echo         }
echo.
echo         return $this->conn;
echo     }
echo }
echo ?^>
) > api\config\database.php

REM Create functions.php
echo Creating includes\functions.php...
(
echo ^<?php
echo // Common utility functions
echo.
echo function generateBookingReference() {
echo     $prefix = 'ET';
echo     $random = strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
echo     return $prefix . '-' . $random;
echo }
echo.
echo function validateEmail($email) {
echo     return filter_var($email, FILTER_VALIDATE_EMAIL);
echo }
echo.
echo function validatePassword($password) {
echo     // Minimum 8 characters, at least 1 letter and 1 number
echo     return preg_match('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/', $password);
echo }
echo.
echo function validatePassport($passport) {
echo     // 13-19 digits
echo     return preg_match('/^\d{13,19}$/', $passport);
echo }
echo.
echo function calculateRefund($bookingDate, $price, $cancellationDate = null) {
echo     if (!$cancellationDate) {
echo         $cancellationDate = new DateTime();
echo     } else {
echo         $cancellationDate = new DateTime($cancellationDate);
echo     }
echo     
echo     $bookingDate = new DateTime($bookingDate);
echo     $hoursDifference = ($cancellationDate->getTimestamp() - $bookingDate->getTimestamp()) / 3600;
echo     
echo     if ($hoursDifference ^<^= 24) {
echo         return $price * 0.9; // 90%% refund
echo     } elseif ($hoursDifference ^<^= 48) {
echo         return $price * 0.75; // 75%% refund
echo     } else {
echo         return $price * 0.5; // 50%% refund
echo     }
echo }
echo.
echo function getDayMultiplier($day) {
echo     $multipliers = [
echo         'monday' => 1.0,
echo         'tuesday' => 1.1,
echo         'wednesday' => 1.2,
echo         'thursday' => 1.15,
echo         'friday' => 1.25,
echo         'saturday' => 1.3,
echo         'sunday' => 1.35
echo     ];
echo     
echo     $dayLower = strtolower($day);
echo     return $multipliers[$dayLower] ?? 1.0;
echo }
echo.
echo function jsonResponse($success, $message = '', $data = [], $statusCode = 200) {
echo     http_response_code($statusCode);
echo     header('Content-Type: application/json');
echo     echo json_encode([
echo         'success' => $success,
echo         'message' => $message,
echo         'data' => $data
echo     ]);
echo     exit;
echo }
echo.
echo function sanitizeInput($data) {
echo     $data = trim($data);
echo     $data = stripslashes($data);
echo     $data = htmlspecialchars($data);
echo     return $data;
echo }
echo.
echo function hashPassword($password) {
echo     return password_hash($password, PASSWORD_DEFAULT);
echo }
echo.
echo function verifyPassword($password, $hash) {
echo     return password_verify($password, $hash);
echo }
echo ?^>
) > includes\functions.php

echo Backend structure created successfully!
echo.
echo Next steps:
echo 1. Create the database in phpMyAdmin using the SQL provided
echo 2. Update your frontend JavaScript to use these API endpoints
echo 3. Test the system by registering a user and making a booking
echo.
pause