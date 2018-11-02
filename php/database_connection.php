<?php
error_reporting(E_ALL & ~E_NOTICE);
//database_connection.php
$conn = new mysqli("localhost", "root", "", "ravaana");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>