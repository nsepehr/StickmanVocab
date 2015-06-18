<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Form variables
$tableName  = 'results';
$fields     = array('user' ,'word', 'answer');


////////////////////////////////////////////////////
//////////// MAIN //////////////////
////////////////////////////////////////////////////
// Initialize the connection class
$connect = new ConnectMySQL($db_userName, $db_password, $db_host, $db_database);

// Validate the required fields
$connect->validateFields($_POST, $fields);

// Test connections to DB
$connect->connect();

// Add user using MySQL query
addAnswer($connect, $fields, $tableName);

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
function addAnswer($connect, $fields, $table)
{
    $user    = $_POST[$fields[0]];
    $word    = $_POST[$fields[1]];
    $answer  = $_POST[$fields[2]]; 
    

    $query = "INSERT INTO `$table` (`ID`, `User`, `Word`, `Answer`) 
            VALUES (NULL, '$user', '$word', '$answer')";
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
