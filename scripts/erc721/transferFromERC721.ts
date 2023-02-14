import { ethers } from "hardhat";
import { ERC721Token__factory } from "../../typechain-types";
import { ERC721Token } from "../../typechain-types/contracts/test";

async function main() {
    const tokenAddr = "<address>"
    const to = "<address>"
    const id = 0;
    const [owner] = await ethers.getSigners();

    const ERC721Token: ERC721Token__factory = await ethers.getContractFactory("ERC721Token");
    const erc721: ERC721Token = ERC721Token.attach(tokenAddr)
    console.log(`ERC721 transferred`, await (await erc721.transferFrom(owner.address, to, id)).wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
