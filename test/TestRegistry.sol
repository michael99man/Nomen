pragma solidity ^0.4.21;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Registry.sol";

contract TestRegistry{
    //gets the address of the contract and initializes a Registry object
    Registry registry = Registry(DeployedAddresses.Registry());
    
    
    function testCanAdd() public {
        bytes32 name = "Sten";
        bool result = registry.register(name);
        bool expected = true;
        
        Assert.equal(result, expected, "Not equal (1)");
        
        name = "Bob";
        result = registry.register(name);
        expected = false;
        Assert.equal(result, expected, "Not equal (2)");
        
        name = "Bobber";
        result = registry.register(name);
        expected = false;
        Assert.equal(result, expected, "Not equal (3)");
    }
    
  
    function testCanGet() public {
        bytes32 name = registry.getName(this);
        bytes32 expected = "Sten";
        Assert.equal(name, expected, "Not equal (1)");
    }
    
}