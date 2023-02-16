import { ethers } from "hardhat";
import { ERC721Token__factory } from "../../typechain-types";
import shell from "shelljs";
async function main() {
  const NAME = "ERC721Token";
  const SYMBOL = "NFT721";
  const ERC721Token: ERC721Token__factory = await ethers.getContractFactory("ERC721Token");
  const erc721 = await ERC721Token.deploy("NFT721", "NFT721")

  await erc721.deployed();
  console.log(`ERC721 deployed at ${erc721.address}`);
  setTimeout(() => {
    console.log(
        "npx hardhat verify --network goerli",
        erc721.address,
        NAME,
        SYMBOL
    );

    shell.exec(`npx hardhat verify --network goerli ${erc721.address} ${NAME} ${SYMBOL}`)
}, 100_000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
