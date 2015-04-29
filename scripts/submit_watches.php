<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 
// For the database connection class
require_once 'Connect_MySQL.php'; 

// Form variables
$tableName  = 'watches';
$fields     = array('user' ,'videos', 'flashes');


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
addWatches($connect, $fields, $tableName);

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
function addWatches($connect, $fields, $table)
{
    $user    = $_POST[$fields[0]];
    $videos  = $_POST[$fields[1]];
    $flashes = $_POST[$fields[2]]; 

    if (count($videos) > 1) {
        $sqlVideo = implode('/', $videos);
    } else if (count($videos) == 1) {
        $sqlVideo = $videos['0'];
    } else {
        $sqlVideo = 'NONE';
    }

    if (count($flashes) > 1) {
        $sqlFlashes = implode('/', $flashes);
    } else if (count($flashes) == 1) {
        $sqlFlashes = $flashes['0'];
    } else {
        $sqlFlashes = 'NONE';
    }
    

    // Built the query for inserting the user data
    $query = "INSERT INTO `$table` (`ID`, `Email`, `videos`, `flashes`) 
            VALUES (NULL, '$user', '$sqlVideo', '$sqlFlashes')";
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
