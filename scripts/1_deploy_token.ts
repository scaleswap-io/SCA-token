import { ethers } from 'hardhat';
import { ScaleSwapToken__factory } from '../typechain/factories/ScaleSwapToken__factory';
import { parseBigNumber } from '../test/shared/parser';
import { expandTo18Decimals } from "../test/shared/utilities"
import { Overrides } from 'ethers';



const _overrides: Overrides = {
  gasLimit: 2000000,
};

const initialSupply = expandTo18Decimals(25_000_000);

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  const [deployer] = await ethers.getSigners();
  const gasPrice = parseBigNumber('GAS_PRICE_GWEI', 30);  //CHANGE GAS PRICE BEFOR DEPLOYING

  const overrides: Overrides = { ..._overrides, gasPrice: gasPrice };
  console.log('Network:', (await ethers.provider.getNetwork()).name);
  console.log('Deploy ScaleSwap Token');
  const token = await new ScaleSwapToken__factory(deployer)
    .deploy(initialSupply, deployer.address, overrides);
  console.log(`\x1b[32m${token.address}\x1b[0m`);
  console.log(`Waiting for result of: \x1b[36m${token.deployTransaction.hash}\x1b[0m`);
  await token.deployTransaction.wait();
  console.log('Success');

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
