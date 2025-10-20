<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "Not logged in";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $event_id = $_POST['event_id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $start_datetime = $_POST['start_datetime'];
    $end_datetime = $_POST['end_datetime'];
    $location = $_POST['location'];
    $participants = json_encode($_POST['participants']);

    $stmt = $conn->prepare("UPDATE events SET title=?, description=?, start_datetime=?, end_datetime=?, location=?, participants=? WHERE id=? AND user_id=?");
    $stmt->bind_param("ssssssii", $title, $description, $start_datetime, $end_datetime, $location, $participants, $event_id, $_SESSION['user_id']);

    if ($stmt->execute()) {
        echo "Event updated";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
