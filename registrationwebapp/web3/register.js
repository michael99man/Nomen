/* register.js */
/*Main front-end Javascript. Asynchronous Javascript is used since our architecture has layers of dependencies on fetched data.*/
/* Handles client-blockchain interactions. Defines a set of functions that each performs client-side actions as the result of web3 callback functions */

var web3Provider = null;
var contracts = {};

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
        web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
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
    });
}

function register(name) {
    var registryInstance;

    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error);
        }

        var account = accounts[0];

        contracts.Registry.deployed().then(function(instance) {
            registryInstance = instance;
            console.log("Setting name: " + name);
            // Execute adopt as a transaction by sending account
            registryInstance.register(name, {from: account}).then(
                function(registry_success){
                    console.log(registry_success);
                }
            );
        }).catch(function(err) {
            console.log(err.message);
        });
    });
}

function getAddr(){ //Tester fucntion; gets the address of the voter
    var registryInstance;
    contracts.Registry.deployed().then(
        function(instance) {
            registryInstance = instance;
            console.log("Checking for: " + web3.eth.accounts[0]);
            registryInstance.getName.call(web3.eth.accounts[0]).then(
                function(result) {
                    console.log(result);
                }
            )
        }           
    );
}



