pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

contract ScaleSwapToken is ERC20PresetFixedSupply {
    
    constructor(uint256 initialSupply, address owner)
        ERC20PresetFixedSupply("ScaleSwapToken", "SCA", initialSupply, owner){}

}
