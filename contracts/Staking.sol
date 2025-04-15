// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IGovToken {
    function mint(address to, uint256 amount) external;
}

contract Staking {
    IERC20 public baseToken;
    IGovToken public govToken;
    uint256 public constant REWARD_PER_DAY = 1e18; // 1 GOV per token per day

    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
        uint256 rewardDebt;
    }

    mapping(address => StakeInfo) public stakes;

    constructor(address _baseToken, address _govToken) {
        baseToken = IERC20(_baseToken);
        govToken = IGovToken(_govToken);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        claimGovToken();
        baseToken.transferFrom(msg.sender, address(this), amount);
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].timestamp = block.timestamp;
    }

    function unstake() external {
        claimGovToken();
        uint256 amt = stakes[msg.sender].amount;
        require(amt > 0, "Nothing to unstake");
        baseToken.transfer(msg.sender, amt);
        delete stakes[msg.sender];
    }

    function claimGovToken() public {
        StakeInfo storage user = stakes[msg.sender];
        if (user.amount > 0) {
            uint256 timeDiff = block.timestamp - user.timestamp;
            uint256 reward = (user.amount * REWARD_PER_DAY * timeDiff) / 1 days;
            govToken.mint(msg.sender, reward);
            user.timestamp = block.timestamp;
        }
    }
}