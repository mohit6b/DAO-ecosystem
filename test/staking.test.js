const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Staking", function () {
  let baseToken, govToken, staking;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await hre.ethers.getSigners();

    baseToken = await hre.ethers.deployContract("TestToken");
    govToken = await hre.ethers.deployContract("GovToken");

    staking = await hre.ethers.deployContract("Staking", [
      baseToken.target,
      govToken.target,
    ]);

    await govToken.setStakingContract(staking.target);

    await baseToken.transfer(user.address, 1000);
    await baseToken.connect(user).approve(staking.target, 1000);
  });

  it("should allow staking and unstaking", async function () {
    await staking.connect(user).stake(500);
    expect((await staking.stakes(user.address)).amount).to.equal(500);

    await time.increase(86400); // simulate 1 day
    await staking.connect(user).unstake();

    expect(await baseToken.balanceOf(user.address)).to.be.closeTo(1000, 1);
  });

  it("should accrue rewards correctly", async function () {
    await staking.connect(user).stake(100);
    await time.increase(86400); // 1 day
  
    await staking.connect(user).claimGovToken();
    expect(await govToken.balanceOf(user.address)).to.be.closeTo(
      hre.ethers.parseEther("100"),
      hre.ethers.parseEther("0.01") // Allow some margin for precision drift
    );
  });
  
});
