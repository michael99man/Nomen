pragma solidity ^0.4.4;

contract Registry {
    //maps each Ethereum address to a name
    // CAN USE A STRUCT!!!!! NOTE
    mapping (address => bytes32) public table;
        
    //Constructor doesn't do anything
    function Registry() public {
    }
    
    /* --- PUBLIC FUNCTIONS --- */
    function register(bytes32 name) public returns (bool){
        if(table[msg.sender] == 0){
            table[msg.sender] = name;
            return true;
        }
        return false;
    }
    
    //returns the name of the nth candidate corresponding to a given address
    function getName(address addr) public view returns (bytes32){
        return table[addr];
    }
}