import hre, { ethers } from "hardhat";
import config from "./config"
import shell from "shelljs"
// Use your own deployed child tunnel addresses here instead!

async function main() {
    let fxChild: string,
        fxERC721: string;

    const network = await hre.ethers.provider.getNetwork();

    if (network.chainId === 137) {
        // Polygon Mainnet
        fxChild = config.mainnet.fxChild.address;
        fxERC721 = config.mainnet.fxERC721.address;
    } else {
        // Mumbai Testnet
        fxChild = config.testnet.fxChild.address;
        fxERC721 = config.testnet.fxERC721.address;
    }

    // const FxERC721 = await hre.ethers.getContractFactory("FxERC721");
    // // const fxERC721 = await FxERC721.deploy();
    // const fxERC721 = FxERC721.attach("0xA94A1366070a1F19deD2efA09B40c3C2E71430B3");
    // // await fxERC721.deployTransaction.wait();
    // console.log("FxERC721 deployed to:", fxERC721.address);


    //
    const FxERC721ChildTunnel = await hre.ethers.getContractFactory("FxERC721ChildTunnelTokenURI");
    const fxERC721ChildTunnelDeployTx = await FxERC721ChildTunnel.deploy(fxChild, fxERC721);
    await fxERC721ChildTunnelDeployTx.deployTransaction.wait();

    console.log("ERC721ChildTunnel deployed to:", fxERC721ChildTunnelDeployTx.address);

    setTimeout(() => {
        console.log("npx hardhat verify --network mumbai", fxERC721);
        shell.exec(`npx hardhat verify --network mumbai ${fxERC721}`)
    }, 50_000);

    setTimeout(() => {
        console.log(
            "npx hardhat verify --network mumbai",
            fxERC721ChildTunnelDeployTx.address,
            fxChild,
            fxERC721
        );

        shell.exec(`npx hardhat verify --network goerli ${fxERC721ChildTunnelDeployTx.address} ${fxChild} ${fxERC721}`)
    }, 50_000);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
