/* authenticate.js */
/*Main front-end Javascript. Asynchronous Javascript is used since our architecture has layers of dependencies on fetched data.*/
/* Handles client-blockchain interactions. Defines a set of functions that each performs client-side actions as the result of web3 callback functions */

var web3Provider = null;
var contracts = {};



/* initializes the account via MetaMask */  
function init(){
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, fallback to the TestRPC
        web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    }
    web3 = new Web3(web3Provider);
}

function signed(){
    var account = web3.eth.accounts[0];
    console.log(account);
    
    web3.personal.sign(web3.toHex(getEpoch()), account, (err,res) => handle(err,res));

    
    console.log(foo);
}

function getEpoch(){
    return Math.round((new Date()).getTime() / 1000);
}


function handle(err, msg){
    if(err!=null){
        // MOST LIKELY, COULDN'T SIGN
        console.log(err);
        return;
    }
    
    
}