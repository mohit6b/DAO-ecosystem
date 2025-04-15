const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployModule", (m) => {
  // 1. Deploy a mock base token (like USDC)
  const testToken = m.contract("TestToken", []);

  // 2. Deploy the GovToken
  const govToken = m.contract("GovToken", []);

  // 3. Deploy the Staking contract with baseToken, govToken, rewardRate
  const staking = m.contract("Staking", [
    testToken, // base token address
    govToken,  // gov token address
  ]);

  // 4. Deploy DAO contract with the gov token
  const dao = m.contract("DAO", [govToken]);

  // 5. Set the staking contract as minter in GovToken
  m.call(govToken, "setStakingContract", [staking]);

  return { testToken, govToken, staking, dao };
});
