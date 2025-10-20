<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "Not logged in";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $start_datetime = $_POST['start_datetime'];
    $end_datetime = $_POST['end_datetime'];
    $location = $_POST['location'];
    $participants = json_encode($_POST['participants']);

    $stmt = $conn->prepare("INSERT INTO events (user_id, title, description, start_datetime, end_datetime, location, participants) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss", $user_id, $title, $description, $start_datetime, $end_datetime, $location, $participants);

    if ($stmt->execute()) {
        echo "Event created";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
