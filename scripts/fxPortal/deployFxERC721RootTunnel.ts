import hre from "hardhat";
import config from "./config"
import shell from "shelljs"

const fxERC721ChildTunnel = "0x11F518b1feDE446397681Deff3c216EA40D32E37";
async function main() {
    let fxRoot: string,
        checkpointManager: string,
        fxERC721: string,
        rootFxERC721: string;

    const network = await hre.ethers.provider.getNetwork();

    if (network.chainId === 1) {
        // Ethereum Mainnet
        fxRoot = config.mainnet.fxRoot.address;
        checkpointManager = config.mainnet.checkpointManager.address;
        fxERC721 = config.mainnet.fxERC721.address;
        rootFxERC721 = config.mainnet.rootFxERC721.address;
    } else {
        // Goerli Testnet
        fxRoot = config.testnet.fxRoot.address;
        checkpointManager = config.testnet.checkpointManager.address;
        fxERC721 = config.testnet.fxERC721.address;
        rootFxERC721 = config.testnet.rootFxERC721.address;
    }

    // console.log(checkpointManager, fxRoot, fxERC20);

    const FxERC721RootTunnel = await hre.ethers.getContractFactory("FxERC721RootTunnelTokenURI");
    const fxERC721RootTunnelDeployTx = await FxERC721RootTunnel.deploy(checkpointManager, fxRoot, fxERC721);
    await fxERC721RootTunnelDeployTx.deployTransaction.wait();

    setTimeout(() => {
        console.log(
            "npx hardhat verify --network goerli",
            fxERC721RootTunnelDeployTx.address,
            checkpointManager,
            fxRoot,
            fxERC721
        );

        shell.exec(`npx hardhat verify --network goerli ${fxERC721RootTunnelDeployTx.address} ${checkpointManager} ${fxRoot} ${fxERC721}`)
    }, 50_000);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
