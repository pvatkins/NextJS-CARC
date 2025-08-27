<?php

function send($con, $message)
{
    $result = mysqli_query($con, $message . ';');
    return $result;
}

$success = true;
$errorMessage = "none";
$result = null;
$jsonString="";
$callsign="";

// Connect to the database
$conn = new mysqli('mysql.pauatk5.dreamhosters.com', 'carcuser', 'gobbledegook', 'carcmbrlst_20231017');
// print_r("****************************************");
// Check connection
if (!$conn) {
    $errorMessage = "Database connection failed: " . mysqli_connect_error();
    $success = false;
} else {
    // Get the JSON data from the request body
    $jsonString = file_get_contents('php://input');
    // print_r("****************************************",$jsonString);

    // Decode the JSON data
    $jsonData = json_decode($jsonString, true);
    $callsign = $jsonData['callsign'];

    $sql = "SELECT `FullName` FROM `merged` WHERE `Callsign` = '" . $callsign . "'";
    $result = send($conn, $sql)->fetch_assoc();

    if (!$result) {
        "Database Query failed: " . mysqli_error($conn);
        $success = false;
    }
}

// Send the response to the original page
header('Content-Type: application/json');
$arr = array(
    'result' => $result,
    'success' => $success, 
    'errorMessage' => $errorMessage, 
    'query' => ($sql . ';'),
    'callsign' =>  $callsign,
);

echo json_encode($arr);

?>
