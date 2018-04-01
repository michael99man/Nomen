<?php

require_once '../../../../vendor/autoload.php';

use Web3\Web3;
use Web3\Contract;
use Web3\Providers\HttpProvider;
use Web3\RequestManagers\HttpRequestManager;

$web3 = new Web3(new HttpProvider(new HttpRequestManager('https://rinkeby.infura.io/1qD29qDBBlWdqwnOqZAo')));

// timeout
$web3 = new Web3(new HttpProvider(new HttpRequestManager('https://rinkeby.infura.io/1qD29qDBBlWdqwnOqZAo', 0.1)));

?>