//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHth";
    uint256 public totalSupply = 100000;

    address public owner;

    mapping(address => uint256) balance;

    constructor() {
        balance[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        console.log("**Sender balance is %s tokens**", balance[msg.sender]);
        console.log(
            "**Sender is sending %s tokens to %m address**",
            amount,
            to
        );
        require(balance[msg.sender] >= amount, "Not Enough Tokens");
        balance[msg.sender] -= amount; // balance[msg.sender] = balance[msg.sender] - amount;
        balance[to] + amount;
    }

    function balanceOfAccount(address account) external view returns (uint256) {
        return balance[account];
    }
}
