// require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
// import('hardhat/config').HardhatUserConfig;
const { vars } = require("hardhat/config");

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const SEP_PRIVATE_KEY = vars.get("SEP_PRIVATE_KEY")
const AMOY_PRIVATE_KEY = vars.get("AMOY_PRIVATE_KEY")
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY")
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${SEP_PRIVATE_KEY}`],
    },
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${AMOY_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
