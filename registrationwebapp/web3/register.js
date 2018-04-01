/* register.js */
/*Main front-end Javascript. Asynchronous Javascript is used since our architecture has layers of dependencies on fetched data.*/
/* Handles client-blockchain interactions. Defines a set of functions that each performs client-side actions as the result of web3 callback functions */

var web3Provider = null;
var contracts = {};

// instance of the registry contract
var registryInstance;

// name associated with this Ethereum address
var registeredName;

//Basic handler to call initializer for Web3
function init(args) {
    page = args;
    console.log("Initializing page: " + page);
    // check for metamask
    if (typeof web3 !== 'undefined' && (web3.eth.accounts.length != 0))
        return initWeb3();
    else {
        noSpinny();
        $("#need_metamask").css('display','block');
        $("#metamast_img").css('display','block');
        return null;
    }
}

//Initializer for Web3. Also calls the initializer for the smart contract.
function initWeb3() {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, CAN'T register
        noSpinny();
        $("#need_metamask").css('display','block');
        return null;
    }
    web3 = new Web3(web3Provider);
    
    return initContract();
}

//Initializer for the smart contract.
function initContract(){
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var RegistryArtifact = abi;

    var Registry = web3.eth.contract(abi);
    registryInstance = Registry.at("0x195dc7c53c6544937bd1b9a08f5e50d244ac26f2");
    
    console.log("Interfaced with contract");
    
    // update name value if already registered
    update(false);
}

// registers this name with the registry
function register(name) {
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
        }
        var account = accounts[0];
        console.log("Setting name: " + name);
        // register this account with the registry
        registryInstance.register(name, {from: account}, function(err, res){
            // this is the transaction ID. Boolean does NOT get returned until it is mined
            
            console.log(res);
            console.log("SENT TRANSACTION");
            update(true);
        });
        createSpinny();
    });
}

// gets the name of this address
function getName(){ 
    console.log("Checking for: " + web3.eth.accounts[0]);
    var sender = web3.eth.accounts[0];
    registryInstance.getName(sender, function(err, res){
        console.log(res);
        
    });
    
    /*
   
    registryInstance.getName.call(web3.eth.accounts[0]).then(
        function(result) {
            var name = web3.toAscii(result);
            console.log(name);
        }
    );     */  
}


// asks the smart contract whether this address has already been registered
// executes the callback function with a boolean 
function hasRegistered(callback){
    registryInstance.getName(web3.eth.accounts[0], function(err,result){
            var bool = (result != 0);
            callback(bool);
    });     
}

// updates the interface after the success/failure of the registration
// updates local storage too
function update(registered){
    console.log("Checking for: " + web3.eth.accounts[0]);
    registryInstance.getName(web3.eth.accounts[0], function(err, result) {
            var name = web3.toAscii(result);
            if(result != 0){
                registeredName = name;
                console.log("Successfully registered: " + name);
                renderPage();
            } else {
                if(registered == true){
                    setTimeout(function() { update(true); }, 5000);
                }
            }
        }
    );   
}



// updates the interface upon load & after registering
function changeField(bool){
    if(!bool){
        $("#has_registered").text = "You have not registered yet";
    } else {
        $("#has_registered").text = "Registered<br>" + web3.eth.accounts[0] + " " + registeredName; 
    }
}

function createSpinny(){
    $(".loader").css('display','block');
    $("#reg_field").css('display','none');
    $("#registerButton").css('display','none');
    $("#loading").css('display','block');
    $("#welcome").css('display','none');
}

function noSpinny(){
    $("#reg_field").css('display','none');
    $("#registerForm").css('margin','0');
    $("#registerButton").css('display','none');
    $("#welcome").css('display','none');
    $(".loader").css('display','none');
    $("#loading").css('display','non');
}

// after successful registration
function renderPage() {
    console.log("RENDERING SUCCESS");
    noSpinny();
    $("#title").html("You're registered!")
    //$("#registration_form").style.display = "none";
    //$("#not_registered").style.display = "none";
    $("#confirm_registered").css('display','block');
    $("#confirm_registered").html("Successfully registered:<br>Address: " + web3.eth.accounts[0] + " <br>Name: " + registeredName);
                    // change GUI
};


