<?php // This script will return the URL of the video index it was asked


// This is where the login information exists for the smv_db instance
require_once 'login_dev.php';
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Script variables
$tableName = 'testvideos';


////////////////////////////////////////////////////
//////////// MAIN //////////////////
////////////////////////////////////////////////////
// Initialize the connection class
$connect = new ConnectMySQL($db_userName, $db_password, $db_host, $db_database);

// Test connections to DB
$connect->connect();

// Grab the video URL & the title
$result = grab_video_url($connect, $tableName);

// echo the result back for Angular in JSON format
echo json_encode($result);

// We have successfully executed the program 
exit(0); 
//---------------------------------------------------//
// Query the database to find the URL of the requested video ID
//---------------------------------------------------//
function grab_video_url($connect, $table) 
{
    $query = "SELECT `URL`,`NAME` FROM `$table`";
    $connect->query($query);
    $result = $connect->getResultAll();

    return $result; 
}


?>
