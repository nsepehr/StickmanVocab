<?php //signup.php for handling the php form

// script global variables

// Formt variables
$firstName = $lastName = $email = $DOB = "";

if (isset($_POST['First-Name'])) $firstName = sanitizeString($_POST['First-Name']);
if (isset($_POST['Last-Name'])) $lastName = sanitizeString($_POST['Last-Name']);
if (isset($_POST['Email'])) $email = sanitizeString($_POST['Email']);
if (isset($_POST['DOB'])) $DOB = sanitizeString($_POST['DOB']);

// Validate the required fields
validateFields($firstName, $lastName, $email, $DOB);
//nima debug
echo "All fields have been entered"; 
echo "First name: $firstName <br>Last name: $lastName<br>Email: $email<br>DOB: $DOB<br>Terms: ";


//---------------------------------------------------//
//------------- functions ---------------------------//
//---------------------------------------------------//

//---------------------------------------------------//
// Go through each required field and validate that something has been entered
//---------------------------------------------------//
function validateFields($firstName, $lastName, $email, $DOB)
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
    $var = mysql_real_escape_string($var);
    $var = sanitizeString($var);
    return $var; 
}
