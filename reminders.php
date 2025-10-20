<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];
$now = date('Y-m-d H:i:s');
$result = $conn->query("SELECT * FROM events WHERE user_id = $user_id AND start_datetime > '$now' ORDER BY start_datetime ASC LIMIT 5");

$reminders = [];
while ($row = $result->fetch_assoc()) {
    $reminders[] = $row;
}

echo json_encode($reminders);
$conn->close();
?>
