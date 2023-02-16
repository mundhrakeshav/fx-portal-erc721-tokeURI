import hre, { ethers } from "hardhat";
import config from "./config"
import shell from "shelljs"
// Use your own deployed child tunnel addresses here instead!

async function main() {
    let fxChild: string,
        erc721Token: string;

    const network = await hre.ethers.provider.getNetwork();

    if (network.chainId === 137) {
        // Polygon Mainnet
        fxChild = config.mainnet.fxChild.address;
    } else {
        // Mumbai Testnet
        fxChild = config.testnet.fxChild.address;
    }

    const FxERC721 = await hre.ethers.getContractFactory("FxERC721");
    const fxERC721 = await FxERC721.deploy();
    await fxERC721.deployTransaction.wait();
    console.log("FxERC721 deployed to:", fxERC721.address);


    //
    const FxERC721ChildTunnel = await hre.ethers.getContractFactory("FxERC721ChildTunnelTokenURI");
    const fxERC721ChildTunnelDeployTx = await FxERC721ChildTunnel.deploy(fxChild, fxERC721.address);
    await fxERC721ChildTunnelDeployTx.deployTransaction.wait();

    console.log("ERC721ChildTunnel deployed to:", fxERC721ChildTunnelDeployTx.address);

    setTimeout(() => {
        console.log("npx hardhat verify --network mumbai", fxERC721.address);
        shell.exec(`npx hardhat verify --network mumbai ${fxERC721.address}`)
    }, 50_000);

    setTimeout(() => {
        console.log(
            "npx hardhat verify --network mumbai",
            fxERC721ChildTunnelDeployTx.address,
            fxChild,
            fxERC721.address
        );

        shell.exec(`npx hardhat verify --network goerli ${fxERC721ChildTunnelDeployTx.address} ${fxChild} ${fxERC721.address}`)
    }, 50_000);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
