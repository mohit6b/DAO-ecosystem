const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("DAO", function () {
  let baseToken, govToken, staking, dao;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await hre.ethers.getSigners();

    baseToken = await hre.ethers.deployContract("TestToken");
    govToken = await hre.ethers.deployContract("GovToken");

    staking = await hre.ethers.deployContract("Staking", [
      baseToken.target,
      govToken.target,
    ]);

    await govToken.setStakingContract(staking.target);

    dao = await hre.ethers.deployContract("DAO", [govToken.target]);

    await baseToken.transfer(user1.address, 1000);
    await baseToken.transfer(user2.address, 1000);
    await baseToken.connect(user1).approve(staking.target, 1000);
    await baseToken.connect(user2).approve(staking.target, 1000);

    await staking.connect(user1).stake(500);
    await staking.connect(user2).stake(100);

    await time.increase(86400);

    await staking.connect(user1).claimGovToken();
    await staking.connect(user2).claimGovToken();
  });

  it("should create a proposal", async function () {
    await dao.connect(user1).createProposal("Proposal 1", 3600);
    const prop = await dao.proposals(0);
    expect(prop.description).to.equal("Proposal 1");
  });

  it("should allow voting and reflect results", async function () {
    await dao.connect(user1).createProposal("Proposal 1", 3600);

    await dao.connect(user1).vote(0, true);
    await dao.connect(user2).vote(0, false);

    const prop = await dao.proposals(0);
    expect(prop.yesVotes).to.be.gt(0);
    expect(prop.noVotes).to.be.gt(0);

    await time.increase(4000);

    const status = await dao.getProposalStatus(0);
    expect(["Passed", "Failed"]).to.include(status);
  });
});
