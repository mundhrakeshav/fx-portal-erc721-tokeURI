// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {LibString} from "solmate/src/utils/LibString.sol";

contract ERC20Token is ERC20 {

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol, 18)
    {}
 
    function mint(address _to, uint256 _amt) external {
        _mint(_to, _amt);
    }
}
