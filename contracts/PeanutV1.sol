// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract PeanutV1 is Initializable {
    // uint256 public constant VERSION = 1;
    uint256 public constant VERSION = 1;
    uint256 public value;
    event ValueChanged(uint256 newValue);
    
    function initialize(uint256 _initValue) public initializer {
        value = _initValue;
    }

    function getValue() public view returns (uint256){
        return value;
    }
    function setValue(uint256 _newValue) public {
        value = _newValue + 100;
        emit ValueChanged(value);
    }
}