<?php 
// This is the PHP class for connecting to MySQL server 

class ConnectMySQL 
{
    
    // Class private variables
    private $user = null;
    private $pass = null; 
    private $host = null;
    private $db   = null;
    private $debug = null;

    // Variables later used in script
    public $connection = null;
    public $result = null;

    // Initializer
    function __construct($user, $pass, $host, $db, $debug = TRUE) {
    	// Initial variables for constructing class
    	$this->user = $user;
    	$this->pass = $pass;
    	$this->host = $host;
    	$this->db   = $db;
    	$this->debug = $debug;
    }

    function myEcho($msg) {
    	if (!$this->debug) {
    		return;
    	}
    	echo($msg);
    }

    function fatalError($msg) {
    	$this->myEcho($msg);
    	if (!$this->connection->connect_errno) {
    		$this->closeConnection();
    	}
        // http response code for internal server error
        http_response_code(500);
    	die();
    }

    function connect() {
    	$this->connection = new mysqli($this->host, $this->user, $this->pass, $this->db);
    	if ($this->connection->connect_errno) {
    		$this->fatalError("Unable to connect to server: " . $this->connection->connect_error);
    	}
    }

    function query($query) {
    	$this->result = $this->connection->query($query);
    	if (!$this->result or $this->connection->error) {
    		$this->fatalError("Query failed: " . $this->connection->error);
    	}
    }

    function closeConnection() {
    	$this->connection->close();
    }

    function getConnection() {
    	return $this->connection;
    }

    function getResult() {
    	// Returns the result object
        $result = $this->result->fetch_assoc();
        if (count($result) < 1){
            $this->fatalError("Empty result returned.");
        }
    	return $result;
    }

    function getResultAll() {
        // Returns the result object
        // fetch_all requires mysqlnd installed $result = $this->result->fetch_all();
        $result = array();
        while($row = $this->result->fetch_assoc()){
            $result[] = $row;
        }
        if (count($result) < 1){
            $this->fatalError("Empty result returned.");
        }
        return $result;
    }

    //---------------------------------------------------//
	// Below functions will sanitizie the form entries so that hackers
	// don't introduce tags in order to attempt to compromize your data
	//---------------------------------------------------//
	function sanitizeString($var) {
    	if (get_magic_quotes_gpc()) $var = stripslashes($var);
    	$var = htmlentities($var);
    	$var = strip_tags($var);
    	return $var;
	}

    //---------------------------------------------------//
    // Loop through the fields array and make sure there's an 
    //   associated value for it in the method array. 
    // This is to make sure all the POST or GET values required
    //   exists. Doing it in a class function will result in less
    //   repeated coding later. 
	//---------------------------------------------------//
	function validateFields($method, $fields) {
		$errFlag = 0;
		foreach ($fields as $entry) {
			if (!$method[$entry]) {
				$errFlag = 1;
				$this->myEcho('Missing required field: ' . $entry);
			}
		}
		if ($errFlag) {
			$this->fatalError('Missing required fields');
		}
	}

    // May want to think about writing functions which return 
    //   an array of result or metadata
}
        