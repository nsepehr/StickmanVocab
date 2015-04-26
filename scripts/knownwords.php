<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Form variables
$tableName  = 'knownwords';
$fields     = array('user' ,'knownWords');


////////////////////////////////////////////////////
//////////// MAIN //////////////////
////////////////////////////////////////////////////
// Initialize the connection class
$connect = new ConnectMySQL($db_userName, $db_password, $db_host, $db_database);

// Validate the required fields
$connect->validateFields($_POST, $fields['0']);

// Test connections to DB
$connect->connect();

// Add user using MySQL query
addKnownWords($connect, $fields, $tableName);

// Succesful :)
echo "Successfully inserted record";
// print_r($_POST['knownWords']);
exit(0);


//---------------------------------------------------//
//------------- functions ---------------------------//
//---------------------------------------------------//

//---------------------------------------------------//
// Add the user who filled the form to the MySQL database table
//---------------------------------------------------//
function addKnownWords($connect, $fields, $table)
{
    // Sanitize strings to prevent hacks
    $user     = $connect->sanitizeString($_POST[$fields[0]]);
    $words    = $_POST[$fields[1]];

    // Loop through the array and create a sring of the known videos
    // The delimiter is /
    $known = '';
    foreach ($words as $key) {
    	$known .= $key . '/';
    }

    // Built the query for inserting the user data
    $query = "INSERT INTO `$table` (`ID`, `Email`, `KnownWords`) 
            VALUES (NULL, '$user', '$known')";
    $connect->query($query);
}

//---------------------------------------------------//
// Only use this function if you have an open MySQL connection
//---------------------------------------------------//
function sanitizeMySQL($var)
{
    if (get_magic_quotes_gpc()) $var = stripslashes($var);
    return mysql_real_escape_string($var);
}
