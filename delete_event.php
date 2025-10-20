<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "Not logged in";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $event_id = $_POST['event_id'];

    $stmt = $conn->prepare("DELETE FROM events WHERE id=? AND user_id=?");
    $stmt->bind_param("ii", $event_id, $_SESSION['user_id']);

    if ($stmt->execute()) {
        echo "Event deleted";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
