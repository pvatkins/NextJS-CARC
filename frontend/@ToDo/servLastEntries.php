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

if (!$conn) {
    $errorMessage = "Database connection failed: " . mysqli_connect_error();
    $success = false;
} else {
    // Get the JSON data from the request body
    $jsonString = file_get_contents('php://input');
    // print_r("****************************************",$jsonString);

    // Decode the JSON data
    $jsonData = json_decode($jsonString, true);
    $numRecords = $jsonData['numRecords'];

    $sql = "SELECT * FROM `pp_tnx` WHERE transaction_status='posted' ORDER BY myindex;";

    $result= send($conn, $sql);
    $mystring = "";

    $myarr = array();
    while ($row = $result->fetch_assoc()) {
        array_push($myarr,$row);
    }

    if (!$result) {                 
        "Database Query failed: " . mysqli_error($conn);
        $success = false;
    }
}

// Send the response back to the original page
header('Content-Type: application/json');
$arr = array(
    'myarr' => $myarr,
    'result' => $result,
    'success' => $success, 
    'errorMessage' => $errorMessage,
    'jsonString' => $jsonString,
);

echo json_encode($arr);

?>
