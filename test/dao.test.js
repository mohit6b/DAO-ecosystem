const { expect } = require("chai");
const hre = require("hardhat");

describe("GovToken", function () {
  it("should mint tokens only from staking contract", async function () {
    const [owner, user] = await hre.ethers.getSigners();
    const govToken = await hre.ethers.deployContract("GovToken");

    await expect(govToken.mint(user.address, 1000)).to.be.revertedWith("Only staking contract can mint");

    await govToken.setStakingContract(owner.address);
    await govToken.mint(user.address, 1000);

    expect(await govToken.balanceOf(user.address)).to.equal(1000);
  });
});
