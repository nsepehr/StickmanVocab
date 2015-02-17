<?php // This script will return the URL of the video index it was asked

$index = $_POST('video-index'); 
if (!isset($index)) {
	// If there was no POST request. die
	die();
}

// This is where the login information exists for the smv_db instance
require_once 'login_dev.php'; 

sanitizeString($index); 

// Test connections to DB
$db_server = connect_to_db($db_userName, $db_password, $db_host);
// Select to database
mysql_select_db($db_database) or mysql_fatal_error('Untable to select database: ');
// Add user
$url = grab_video_url($db_database, 'testvideos', $index);
// Close the connection
mysql_close($db_server);

// echo the result back for AJAX
echo $url; 

// We have successfully executed the program 
exit(0); 
//---------------------------------------------------//
// Query the database to find the URL of the requested video ID
//---------------------------------------------------//
function grab_video_url($db, $table, $index) 
{
    $query = "SELECT * FROM `$table` WHERE `ID` = $index";
    $result = mysql_query($query); 
    if (!$result) mysql_fatal_error("Unable to grab record: ");
    // There should be only one result returned
    $rows = mysql_num_rows($result);
    if (count($rows) > 1) {
        echo "Uexpected num of rows"; 
        exit(1); 
    }
    return $result[0]; 
}
//---------------------------------------------------//
// Test to see if we can conenct to the host
//---------------------------------------------------//
function connect_to_db($user, $pass, $host) 
{
    // Use the built-in function to connect to the db
    $db_server = mysql_connect($host, $user, $pass); 
    if (!$db_server) mysql_fatal_error('Unable to connect to database: ');
    return $db_server;
}

//---------------------------------------------------//
// Print a user-friendly message upon errors in MySQL related issue
//---------------------------------------------------//
function mysql_fatal_error($msg)
{
    $msg2 = mysql_error(); 
    echo <<< _END
<br>SMV is sad :( <br>
<p>$msg: $msg2</p> <br>
_END;
    exit(1);
}

//---------------------------------------------------//
// Below functions will sanitizie the form entries so that hackers
// don't introduce tags in order to attempt to compromize your data
//---------------------------------------------------//
function sanitizeString($var)
{
    if (get_magic_quotes_gpc()) $var = stripslashes($var);
    $var = htmlentities($var);
    $var = strip_tags($var);
    return $var;
}

//---------------------------------------------------//
// Only use this function if you have an open MySQL connection
//---------------------------------------------------//
function sanitizeMySQL($var)
{
    if (get_magic_quotes_gpc()) $var = stripslashes($var);
    return mysql_real_escape_string($var);
}

?>
