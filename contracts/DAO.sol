// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Balance {
    function balanceOf(address) external view returns (uint256);
}

contract DAO {
    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
    }

    IERC20Balance public govToken;
    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public voted;

    constructor(address _govToken) {
        govToken = IERC20Balance(_govToken);
    }

    function createProposal(string calldata description, uint256 duration) external {
        proposals.push(Proposal(description, 0, 0, block.timestamp + duration, false));
    }

    function vote(uint256 id, bool support) external {
        Proposal storage p = proposals[id];
        require(block.timestamp < p.deadline, "Voting ended");
        require(!voted[id][msg.sender], "Already voted");
        voted[id][msg.sender] = true;

        uint256 power = govToken.balanceOf(msg.sender);
        require(power > 0, "No voting power");

        if (support) {
            p.yesVotes += power;
        } else {
            p.noVotes += power;
        }
    }

    function getProposalStatus(uint256 id) external view returns (string memory) {
        Proposal memory p = proposals[id];
        if (block.timestamp < p.deadline) return "Voting in progress";
        return p.yesVotes > p.noVotes ? "Passed" : "Failed";
    }
}