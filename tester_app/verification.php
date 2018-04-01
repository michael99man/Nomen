<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Web3\Web3;
use Web3\Contract;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;

require "web3.php";

/* Verification contract */
$verificationAbi = '[{"constant":true,"inputs":[{"name":"msgHash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"RecoverAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}]';
$contractAddress = '0x5481c0fe170641bd2e0ff7f04161871829c1902d'; // on Ropsten and Rinkeby

$web3 = new Web3(new HttpProvider(new HttpRequestManager('https://rinkeby.infura.io/1qD29qDBBlWdqwnOqZAo')));

$contractArtifact = new Contract($web3->provider, $verificationAbi);
$verificationContract = $contractArtifact->at($contractAddress);

verify("0xe1b7cafb385eb8b18c9e60808307e8c6c3dc3759ae83a97b0bd05d302c6d2be454b2f2ab6b73ff86cd3a265c11a2518d248db7a2fdb087fa3182cc48ce50492d1c");

function verify($signature){
    echo "SIGNATURE: " . $signature . "<br>";
    $signature = substr($signature, 2);
    	$r = '0x' . substr($signature, 0, 64);
		$s = '0x' . substr($signature, 64, 64);
		$v = '0x' . substr($signature, 128, 2);
    
    $verificationContract->call("RecoverAddress", hashMessage("1522574497"), $v, $r, $s, function($err,$res){
        
        print_r($res);
        
    });
}



// call contract function
$registry->call("getName", "0xbE26180E10b3Ba1242c675c2096775657BaA53f9", function($err, $res){
    
    $name = $res[0];
});



function hashMessage($msg){
    return hash('sha3-512' , '\x19Ethereum Signed Message:\n' + msg.length + msg);
}


?>