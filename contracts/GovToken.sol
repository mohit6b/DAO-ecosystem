// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GovToken is ERC20 {
    address public stakingContract;

    modifier onlyStaking() {
        require(msg.sender == stakingContract, "Only staking contract can mint");
        _;
    }

    constructor() ERC20("GovToken", "GOV") {}

    function setStakingContract(address _staking) external {
        require(stakingContract == address(0), "Already set");
        stakingContract = _staking;
    }

    function mint(address to, uint256 amount) external onlyStaking {
        _mint(to, amount);
    }
}