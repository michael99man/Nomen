<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/*
if(isset($_POST["submit"])) { 
    die("Bad access");
}*/


require_once '../../../../vendor/autoload.php';

use Web3\Web3;
use Web3\Contract;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;

$web3 = new Web3(new HttpProvider(new HttpRequestManager('https://rinkeby.infura.io/1qD29qDBBlWdqwnOqZAo')));

// timeout
$web3 = new Web3(new HttpProvider(new HttpRequestManager('https://rinkeby.infura.io/1qD29qDBBlWdqwnOqZAo', 0.1)));

/**
 * registryAbi
 * @var string
 */
$registryAbi = '[{"constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "table", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "name", "type": "bytes32" } ], "name": "register", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "addr", "type": "address" } ], "name": "getName", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }]';

// interfacing with the registry contract
$contract = new Contract($web3->provider, $registryAbi);
$registry = $contract->at("0x195dc7c53c6544937bd1b9a08f5e50d244ac26f2");


/* POST DATA FROM THE CLIENT SIDE */
$address = $_POST["address"];
$signed_timestamp = $_POST["timestamp"];




// call contract function
$registry->call("getName", "0xbE26180E10b3Ba1242c675c2096775657BaA53f9", function($err, $res){
    
    $name = $res[0];
});






/* Verification contract */

$verificationAbi = '[{"constant":true,"inputs":[{"name":"msgHash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"RecoverAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}]';
$contractAddress = '0x5481c0fe170641bd2e0ff7f04161871829c1902d'; // on Ropsten and Rinkeby
$contractArtifact = new Contract($web3->provider, $verificationAbi);
$signAndVerifyContract = $contractArtifact->at($contractAddress);


echo $web3->hash('bob');

/*
function checkSign($err, $signature) {
	if (!err) {

		$signature = substr($signature, 2);
		$r = '0x' + substr($signature, 0, 64);
		$s = '0x' + substr($signature,64, 64);
		$v = '0x' + substr($signature,128, 2);
				
		echo "r: " . $r . "<br>";
		echo "s: " . $s . "<br>";
        echo "v: " . $v . "<br>";
        
		$signAndVerifyContract->call("RecoverAddress", $web3->hash('Bob'), $v, $r, $s, $verifyHandler, callBack);
	} else {
		echo 'Coult not sign message:' + $err;
	}
}

function callBack($hi){
    echo $hi + "<br>";
}*/

?>