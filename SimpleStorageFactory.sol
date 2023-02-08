//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract SimpleStorageFactory {
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint _favNumber, uint _storageIndex) public {
        SimpleStorage simpleStorage = simpleStorageArray[_storageIndex];
        simpleStorage.store(_favNumber);
    }

    function sfRetrieve(uint _storageIndex) public view returns (uint) {
        return simpleStorageArray[_storageIndex].retrieve();
    }
}
