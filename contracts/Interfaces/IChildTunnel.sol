// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract IChildTunnel {
    function withdrawTo(
        address childToken,
        address receiver,
        uint256 tokenId,
        bytes memory data
    ) external {}
}
