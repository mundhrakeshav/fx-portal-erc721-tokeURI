import hre, { ethers } from "hardhat";
import config from "./config"
import shell from "shelljs"
// Use your own deployed child tunnel addresses here instead!
const fxERC721ChildTunnel = "0x96d26FCA4cB14e14CABc28eF8bc8Aba0E03702A8";

async function main() {
    let fxRoot: string,
        checkpointManager: string,
        fxERC20: string,
        rootFxERC20: string,
        fxERC721: string,
        rootFxERC721: string,
        fxERC1155: string,
        rootFxERC1155: string;

    const network = await hre.ethers.provider.getNetwork();

    if (network.chainId === 1) {
        // Ethereum Mainnet
        fxRoot = config.mainnet.fxRoot.address;
        checkpointManager = config.mainnet.checkpointManager.address;
        fxERC20 = config.mainnet.fxERC20.address;
        rootFxERC20 = config.mainnet.rootFxERC20.address;
        fxERC721 = config.mainnet.fxERC721.address;
        rootFxERC721 = config.mainnet.rootFxERC721.address;
        fxERC1155 = config.mainnet.fxERC1155.address;
        rootFxERC1155 = config.mainnet.rootFxERC1155.address;
    } else if (network.chainId === 5) {
        // Goerli Testnet
        fxRoot = config.testnet.fxRoot.address;
        checkpointManager = config.testnet.checkpointManager.address;
        fxERC20 = config.testnet.fxERC20.address;
        rootFxERC20 = config.testnet.rootFxERC20.address;
        fxERC721 = config.testnet.fxERC721.address;
        rootFxERC721 = config.testnet.rootFxERC721.address;
        fxERC1155 = config.testnet.fxERC1155.address;
        rootFxERC1155 = config.testnet.rootFxERC1155.address;
    } else {
        fxRoot = process.env.FX_ROOT!;
        checkpointManager = process.env.CHECKPOINT_MANAGER!;
        fxERC20 = process.env.FX_ERC20!;
        rootFxERC20 = process.env.FX_ERC20_MINTABLE!;
        fxERC721 = process.env.FX_ERC721!;
        rootFxERC721 = process.env.FX_ROOT_ERC721!;
        fxERC1155 = process.env.FX_ERC1155!;
        rootFxERC1155 = process.env.FX_ERC1155_MINTABLE!;
    }
    
    // console.log(checkpointManager, fxRoot, fxERC20);
    
    const FxERC721RootTunnel = await hre.ethers.getContractFactory("FxERC721RootTunnel");
    const fxERC721RootTunnelDeployTx = await FxERC721RootTunnel.deploy(checkpointManager, fxRoot, fxERC20);
    await fxERC721RootTunnelDeployTx.deployTransaction.wait();
    
    setTimeout(() => {
        console.log(
            "npx hardhat verify --network goerli",
            fxERC721RootTunnelDeployTx.address,
            checkpointManager,
            fxRoot,
            fxERC20
        );
        
        shell.exec(`npx hardhat verify --network goerli ${fxERC721RootTunnelDeployTx.address} ${checkpointManager} ${fxRoot} ${fxERC20}`)
    }, 100_000);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
