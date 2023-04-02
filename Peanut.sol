// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract Peanut is Initializable {
    uint256 public constant VERSION = 2;
    uint256 public value;
    uint256 public number;
    event ValueChanged(uint256 newValue);
    event NumberChanged(uint256 number);
    
    function initialize(uint256 _initValue) public initializer {
        value = _initValue;
    }

    function getValue() public view returns (uint256){
        return value;
    }
    function setValue(uint256 _newValue) public {
        value = _newValue + 200;
        emit ValueChanged(value);
    }

    function setNum(uint256 _num) public {
        number = value + _num;
        emit NumberChanged(number);
    }
}