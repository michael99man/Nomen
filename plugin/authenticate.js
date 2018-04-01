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

// asks user for signature approval, then posts this data
function login(){
    console.log("LOGGING IN");
    var account = web3.eth.accounts[0];
    console.log(account);
    
    var plain = getEpoch();
    console.log("PLAIN: " + plain);
    console.log("WAITING FOR SIGNING APPROVAL");
    web3.personal.sign(web3.toHex(plain), account, (err,res) => post(err,res, account));
}


function getEpoch(){
    return Math.round((new Date()).getTime() / 1000);
}

// posts data to server
function post(err, signed, account){
    var util = {};
    
    
    util.post = function(url, fields) {
        var $form = $('<form>', {
            action: url,
            method: 'post'
        });
        $.each(fields, function(key, val) {
             $('<input>').attr({
                 type: "hidden",
                 name: key,
                 value: val
             }).appendTo($form);
        });
        $form.appendTo('body').submit();
    }
    
    util.post("http://michaelman.net/nomen/plugin/locked_zone.php", {timestamp: signed, address: account});
}


