require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: process.env.POLYGON_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
    zksync: {
      url: process.env.ZKSYNC_RPC,
      accounts: [process.env.PRIVATE_KEY],
      zksync: true,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
    },
  },
};
