<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/*
if(isset($_POST["submit"])) { 
    die("Bad access");
}*/

require "web3.php";

use Web3\Web3;
use Web3\Contract;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;


include "verification.php";

// QUIT IF NOT POSTING
if(!isset($_POST["address"]) || !isset($_POST["timestamp"])){
    die("Bad access.");
}

/* POST DATA FROM THE CLIENT SIDE */
$address = $_POST["address"];
$signed_timestamp = $_POST["timestamp"];

/**
 * registryAbi
 * @var string
 */
$registryAbi = '[{"constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "table", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "name", "type": "bytes32" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "getName", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }]';

// interfacing with the registry contract
$contract = new Contract($web3->provider, $registryAbi);
$registry = $contract->at("0x195dc7c53c6544937bd1b9a08f5e50d244ac26f2");

$result = verify($signed_timestamp, $address, $verificationContract, true);

if($result == false){
    die("FAILED TO AUTHENTICATE");
}

usleep(300000);

// call contract function
$registry->call("getName", $address, function($err, $res){
    $name = hex2str($res[""]);
    
    if($name == ""){
        $registry->call("getName", $address, function($e, $r){
            $foo = hex2str($r[""]);
            processOutput($foo);
        });
        return;
    }
    processOutput($name);
});

// converts a hex string into an ASCII string
function hex2str($hex) {
    $str = '';
    for($i=0;$i<strlen($hex);$i+=2) $str .= chr(hexdec(substr($hex,$i,2)));
    return $str;
}

function processOutput($name){
    echo "Welcome to Facebook, " . $name . "<br><br><br>";
    
    echo "Don't mind us, we're just running some code on our servers to provide the best possible user experience!<br><br>";
    
    echo "Pipe failure: stdout redirected to user.dashboard<br>";
    echo "npm install cambridge_analytica<br>";
    echo "Install successful. Rig election? [y/n]<br>";
    echo "y<br><br>";
    echo "cat fakenews.txt | distribute --users=all<br>";
    echo "<br>";
    echo "cat userData | bzip2 -c > user_out<br>";
    echo "scp userOut markzuckerberg@ebay.com<br>";
    echo "ebay_api -startauction -minbidder --file=user_out<br>";
    echo "<br>";
    echo "<p><i>If the product is free, you are the product</i> - Unknown<p><br>";
    echo "Anyways, we hope you enjoy Facebook!";
}

?>