<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Form variables
$tableName  = 'smvtestusers';
$fields     = array('firstName', 'lastName', 'email', 'DOB', 'nationality');


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
addUserToTable($connect, $fields, $tableName);

// Succesful :)
echo "Successfully inserted record";
exit(0);


//---------------------------------------------------//
//------------- functions ---------------------------//
//---------------------------------------------------//

//---------------------------------------------------//
// Add the user who filled the form to the MySQL database table
//---------------------------------------------------//
function addUserToTable($connect, $fields, $table)
{
    // Sanitize strings to prevent hacks
    $firstName = $connect->sanitizeString($_POST[$fields[0]]);
    $lastName  = $connect->sanitizeString($_POST[$fields[1]]);
    $email     = $connect->sanitizeString($_POST[$fields[2]]);
    $DOB       = $connect->sanitizeString($_POST[$fields[3]]);
    $origin    = $connect->sanitizeString($_POST[$fields[4]]);

    // Built the query for inserting the user data
    $query = "INSERT INTO `$table` (`ID`, `First Name`, `Last Name`, `DOB`, `Email`, `Nationality`) 
            VALUES (NULL, '$firstName', '$lastName', '$DOB', '$email', '$origin')";
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
