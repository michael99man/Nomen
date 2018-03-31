/* register.js */
/*Main front-end Javascript. Asynchronous Javascript is used since our architecture has layers of dependencies on fetched data.*/
/* Handles client-blockchain interactions. Defines a set of functions that each performs client-side actions as the result of web3 callback functions */

var web3Provider = null;
var contracts = {};

// instance of the registry contract
var registryInstance;

//Basic handler to call initializer for Web3
function init(args) {
    page = args;
    console.log("Initializing page: " + page);
    return initWeb3();
}

//Initializer for Web3. Also calls the initializer for the smart contract.
function initWeb3() {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, fallback to the TestRPC
        web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    }
    web3 = new Web3(web3Provider);
    
    return initContract();
}

//Initializer for the smart contract.
function initContract(){
    $.getJSON('Registry.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var RegistryArtifact = data;
        contracts.Registry = TruffleContract(RegistryArtifact);

        // Set the provider for our contract
        contracts.Registry.setProvider(web3Provider);
        console.log("Initialized contract");
        
        contracts.Registry.deployed().then(function(instance) {
            registryInstance = instance;
            console.log("Interfaced with contract")
        });
    });
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
        registryInstance.register(name, {from: account}).then(
            function(registry_success){
                // this is the transaction ID. Boolean does NOT get returned until it is mined
                console.log(registry_success);
                update();
            }
        );
    });
}

// gets the name of this address
function getName(){ 
    console.log("Checking for: " + web3.eth.accounts[0]);
    registryInstance.getName.call(web3.eth.accounts[0]).then(
        function(result) {
            var name = web3.toAscii(result);
            console.log(name);
        }
    );       
}


// asks the smart contract whether this address has already been registered
// executes the callback function with a boolean 
function hasRegistered(callback){
    registryInstance.getName.call(web3.eth.accounts[0]).then(
        function(result) {
            var bool = (result != 0);
            callback(bool);
            console.log("Registered: " + bool);
        }
    );     
}

// updates the interface after the success/failure of the registration
function update(){
    console.log("Checking for: " + web3.eth.accounts[0]);
    registryInstance.getName.call(web3.eth.accounts[0]).then(
        function(result) {
            var name = web3.toAscii(result);
            console.log("Successfully registered: " + name);
            // CHANGE GUI
        }
    );   
}



// updates the interface upon load 








