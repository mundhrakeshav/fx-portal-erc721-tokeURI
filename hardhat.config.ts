import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `${process.env.MUMBAI_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 80001
    },
    goerli: {
      url: `${process.env.GOERLI_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5
    },
    // mainnet: {
    //   url: `${process.env.MAINNET_URL}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // }
  },
  etherscan: {
    apiKey: {
      mainnet: `${process.env.ETHERSCAN_API_KEY}`,
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      polygonMumbai: `${process.env.POLYGONSCAN_API_KEY}`
    }
  },


};

export default config;
