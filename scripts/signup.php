<?php //signup.php for handling the php form

// This is where the login information exists for the smv_db instance
//require_once 'login.php'; 
require_once 'login_dev.php'; 

// Formt variables
$firstName = $lastName = $email = $DOB = $terms = $nationality = "";
$tableName = 'smvtestusers';
$gotoUrl   = '/#/guide.html';
#$gotoUrl   = 'http://www.stickmanvocab.com/pages/guide.html';

if (isset($_POST['First-Name'])) $firstName = sanitizeString($_POST['First-Name']);
if (isset($_POST['Last-Name'])) $lastName = sanitizeString($_POST['Last-Name']);
if (isset($_POST['Email'])) $email = sanitizeString($_POST['Email']);
if (isset($_POST['DOB'])) $DOB = sanitizeString($_POST['DOB']);
// Fix this when the HTML is corrected
//if (isset($_POST['DOB'])) $DOB = sanitizeString($_POST['DOB']);
$nationality = 'world';
if (isset($_POST['Terms'])) $terms = sanitizeString($_POST['Terms']);

////////////////////////////////////////////////////
//////////// MAIN //////////////////
////////////////////////////////////////////////////
// Validate the required fields
validate_fields($firstName, $lastName, $email, $DOB, $terms);

//nima debug
echo "All fields have been entered<br>"; 
echo "First name: $firstName <br>Last name: $lastName<br>Email: $email<br>DOB: $DOB<br>Terms: ";
sleep(3);

// Test connections to DB
$db_server = connect_to_db($db_userName, $db_password, $db_host);
// Select to database
mysql_select_db($db_database) or mysql_fatal_error('Untable to select database: ');
// Add user
add_user_to_table($db_database, 'smvtestusers', $firstName, $lastName, $DOB, $email, $nationality);
// Succesful :)
echo "Successfully inserted record<br>";
// Close the connection
mysql_close($db_server);

// Go to the next page
go_next($gotoUrl);


//---------------------------------------------------//
//------------- functions ---------------------------//
//---------------------------------------------------//

//---------------------------------------------------//
// After a successful data insertion, go to next page 
//---------------------------------------------------//
function go_next($url) 
{
    //clear out the output buffer
    while (ob_get_status()) 
    {
        ob_end_clean();
    }
    
    // no redirect
    header( "Location: $url");
}
//---------------------------------------------------//
// Add the user who filled the form to the MySQL database table
//---------------------------------------------------//
function add_user_to_table($db, $table, $firstName, $lastName, $DOB, $email, $origin)
{
    // Sanitize the entered values to prevent hacks
    $firstName = sanitizeMySQL($firstName); 
    $lastName  = sanitizeMySQL($lastName); 
    $DOB       = sanitizeMySQL($DOB); 
    $email     = sanitizeMySQL($email); 
    $origin    = sanitizeMySQL($origin); 

    // Built the query for inserting the user data
    $query = "INSERT INTO `$db`.`$table` (`ID`, `First Name`, `Last Name`, `DOB`, `Email`, `Nationality`) VALUES (NULL, '$firstName', '$lastName', '$DOB', '$email', '$origin')";
    $result = mysql_query($query);
    if (!$result) mysql_fatal_error('Unable to insert record: ');
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
Please click the back button and try again. <br>
If you still having problems contact us <a href="mailto:smvsupport@gmail.com">SMV Support</a> <br>
 Thank you
_END;
    die();
}
//---------------------------------------------------//
// Go through each required field and validate that something has been entered
//---------------------------------------------------//
function validate_fields($firstName, $lastName, $email, $DOB, $terms)
{
    $fieldFlag = 0;
    if ($firstName == '') {
        echo("ERROR: No first name entered <br>");
        $fieldFlag = 1;
    } 
    if ($lastName == '') {
        echo("ERROR: No last name entered <br>");
        $fieldFlag = 1;
    } 
    if ($email == '') {
        echo("ERROR: No email address entered <br>");
        $fieldFlag = 1; 
    }
    if ($DOB == '') {
        echo("ERROR: No date of birth has been entered <br>");
        $fieldFlag = 1;
    }
    if (!$terms) {
    #    echo("ERROR: Terms and conditions have not been accepted <br>");
    #    $fieldFlag = 1;
    }
    
    // Exit the program if a required field is missing
    if ($fieldFlag == 1) exit(1);
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
