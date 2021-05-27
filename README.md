SCA Token ERC20 Contract
Scaleswap Token (SCA)
---

Collection of Ethereum smart contracts for the
[Scaleswap](https://scaleswap.io) platform token

This is the official SCA token address:
https://etherscan.io/token/0x4791143576c375919d086c35d989feff61d2c390

# Security Audit by Hacken.io
https://hacken.io/wp-content/uploads/2021/05/ScaleSwap_27052021SCAudit_Report.pdf

# Technology

This project uses [Hardhat framework](https://hardhat.org/) and the smart
contracts are written in Solidity language (version 0.8.3).
The token contract uses the ERC20 standard with a fixed supply and burnable functions.

The simplified version of the SCA token is compilable in a Remix editor. 

# Token mechanics

Scaleswap token (ticker SCA) implements
[ERC20](https://en.wikipedia.org/wiki/ERC20) interface and is compatible with
all wallets and exchanges that support this standard.

The token extends the ERC20 interface in a backward compatible way with features
essential for distribution, like:
- hard cap, limiting total supply to the maximum of 25 mln SCA tokens created
  in the process of minting


## ERC20

 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.

## Burning
/**
 * @dev {ERC20} token, including:
 *
 *  - Preminted initial supply
 *  - Ability for holders to burn (destroy) their tokens
 *  - No access control mechanism (for minting/pausing) and hence no governance
 *
 * This contract uses {ERC20Burnable} to include burn capabilities - head to
 * its documentation for details.
 *
 * _Available since v3.4._
 */


## Fixed Supply
    /**
     * @dev Mints `initialSupply` amount of token and transfers them to `owner`.
     *
     * See {ERC20-constructor}.
     */


## Build instructions:
```sh
npm i
npm run build
```

## Test instructions:
```sh
npm run test
```

## Deploy instructions:
```sh
npm run deploy --{network}
```
