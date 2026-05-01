<?php
// Simple database test
header('Content-Type: text/html; charset=utf-8');
echo "<h1>Database Connection Test</h1>";

// Include database config
require_once 'api/config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    if ($conn) {
        echo "<p style='color: green; font-weight: bold;'>✅ Database connected successfully!</p>";
        
        // Test query
        $stmt = $conn->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        echo "<h3>Tables in database:</h3>";
        if (count($tables) > 0) {
            echo "<ul>";
            foreach ($tables as $table) {
                echo "<li>$table</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No tables found. Database is empty.</p>";
        }
        
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ Database connection failed!</p>";
    }
} catch (Exception $e) {
    echo "<p style='color: red; font-weight: bold;'>❌ Error: " . $e->getMessage() . "</p>";
    
    // Try to create database
    echo "<h3>Trying to create database...</h3>";
    try {
        $temp_conn = new PDO("mysql:host=localhost", "root", "");
        $temp_conn->exec("CREATE DATABASE IF NOT EXISTS airline_booking_system");
        echo "<p style='color: green;'>Database created successfully!</p>";
    } catch (Exception $ex) {
        echo "<p style='color: red;'>Failed to create database: " . $ex->getMessage() . "</p>";
    }
}

// Show PHP info
echo "<hr><h3>PHP Information:</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "PDO MySQL Driver: " . (extension_loaded('pdo_mysql') ? "Enabled" : "Disabled");
?>