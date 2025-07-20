require("@nomiclabs/hardhat-ethers");

const INFURA_API_KEY = "d13a1e95c6904ef5be8d143ccc533a53";
const PRIVATE_KEY = "32cccff7a58601e6faca2b72ca8e1bafe589496e735f470e830be8fc2e473eb4";

module.exports = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    // You can add other networks here (mainnet, sepolia, etc.)
  }
};
