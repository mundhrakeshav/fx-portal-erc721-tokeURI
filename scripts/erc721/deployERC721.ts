import { ethers } from "hardhat";
import { ERC721Token__factory } from "../../typechain-types";

async function main() {
  const ERC721Token: ERC721Token__factory = await ethers.getContractFactory("ERC721Token");
  const erc721 = await ERC721Token.deploy("ERC721Token", "NFT721")

  await erc721.deployed();

  console.log(`ERC721 deployed at ${erc721.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
