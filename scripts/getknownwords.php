<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Form variables
$tableName  = 'knownwords';
$fields     = array('user');


////////////////////////////////////////////////////
//////////// MAIN //////////////////
////////////////////////////////////////////////////
// Initialize the connection class
$connect = new ConnectMySQL($db_userName, $db_password, $db_host, $db_database);

// Validate the required fields
$connect->validateFields($_GET, $fields);

// Test connections to DB
$connect->connect();

// Add user using MySQL query
$knownWordsString = getKnownWords($connect, $fields, $tableName);

// Returned result in in string delimited by '/'. Split it and put in array
$knownWordsArray = explode('/', $knownWordsString);

// Succesful :)
echo json_encode($knownWordsArray);

exit(0);


//---------------------------------------------------//
//------------- functions ---------------------------//
//---------------------------------------------------//

//---------------------------------------------------//
// Add the user who filled the form to the MySQL database table
//---------------------------------------------------//
function getKnownWords($connect, $fields, $table)
{
    // Sanitize strings to prevent hacks
    $user     = $connect->sanitizeString($_GET[$fields[0]]);

    // Built the query for grabbing the known words
    $query = "SELECT `knownWords` FROM `$table` WHERE `Email` = '$user'";

    $connect->query($query);
    $results = $connect->getResult();
    return $results['knownWords'];
}

//---------------------------------------------------//
// Only use this function if you have an open MySQL connection
//---------------------------------------------------//
function sanitizeMySQL($var)
{
    if (get_magic_quotes_gpc()) $var = stripslashes($var);
    return mysql_real_escape_string($var);
}
