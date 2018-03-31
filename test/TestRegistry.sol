pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract TestRegistry{
    //gets the address of the contract and initializes a Registry object
    Registry registry = Registry(DeployedAddresses.Registry());
    
    
    function testCanAdd() {
        bytes32 name = "Sten";
        bool result = registry.register(name);
        bool expected = true;
        
        Assert.equal(candidate, expected, "Not equal (1)");
        
        name = "Bob";
        result = registry.register(name);
        expected = false;
        Assert.equal(candidate, expected, "Not equal (2)");
        
        name = "Bobber";
        result = registry.register(name);
        expected = false;
        Assert.equal(candidate, expected, "Not equal (3)");
    }
    
  
    function testCanGet() {
        bytes32 name = registry.get(this);
        bytes32 expected = "Sten";
        Assert.equal(candidate, expected, "Not equal (1)");
    }
    
}