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

$contractArtifact = new Contract($web3->provider, $verificationAbi);
$verificationContract = $contractArtifact->at($contractAddress);


// PARAMS: signature, address (public key of signer), contract location for verification, and debug flag
function verify($signature, $address, $contract, $DEBUG){
    echo "SIGNATURE: " . $signature . "<br>";
    $signature = substr($signature, 2);
    $r = '0x' . substr($signature, 0, 64);
    $s = '0x' . substr($signature, 64, 64);
    $v = '0x' . substr($signature, 128, 2);
    
    echo $r . " " . $s . " " . $v . "<br>";
    
    if($DEBUG){
        return true;
    }
    
    $contract->call("RecoverAddress", hashMessage("1522574497"), $v, $r, $s, function($err,$res){
        
        print_r($res);
        
    });
}

function hashMessage($msg){
    return hash('sha3-512' , '\x19Ethereum Signed Message:\n' . strlen($msg) . $msg);
}


?>