<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Form variables
$tableName  = 'quizes';
//$fields     = array('user');


////////////////////////////////////////////////////
//////////// MAIN //////////////////
////////////////////////////////////////////////////
// Initialize the connection class
$connect = new ConnectMySQL($db_userName, $db_password, $db_host, $db_database);

// Validate the required fields
//$connect->validateFields($_GET, $fields);

// Test connections to DB
$connect->connect();

// Add user using MySQL query
$data = getQuizData($connect, $tableName);
//$videoListString = $watchListArray['Videos'];
//$flashListString = $watchListArray['Flashes'];

// Succesful :)
echo json_encode($data);

exit(0);


//---------------------------------------------------//
//------------- functions ---------------------------//
//---------------------------------------------------//

//---------------------------------------------------//
// Add the user who filled the form to the MySQL database table
//---------------------------------------------------//
function getQuizData($connect, $table)
{
    // Built the query for grabbing the known words
    $query = "SELECT * FROM `$table` ";

    $connect->query($query);
    $results = $connect->getResultAll();
    return $results;
}

//---------------------------------------------------//
// Only use this function if you have an open MySQL connection
//---------------------------------------------------//
function sanitizeMySQL($var)
{
    if (get_magic_quotes_gpc()) $var = stripslashes($var);
    return mysql_real_escape_string($var);
}
