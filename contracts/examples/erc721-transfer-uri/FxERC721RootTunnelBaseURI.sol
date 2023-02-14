// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {FxERC721RootTunnel} from "./FxERC721RootTunnel.sol";

contract FxERC721RootTunnelBaseURI is FxERC721RootTunnel {
    constructor(
        address _checkpointManager,
        address _fxRoot,
        address _fxERC721Token
    ) FxERC721RootTunnel(_checkpointManager, _fxRoot, _fxERC721Token) {}

    function baseURI() internal pure override returns (string memory) {
        return "";
    }
}
