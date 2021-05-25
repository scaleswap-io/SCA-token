import chai, { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { ethers } from 'hardhat';
import { ScaleSwapToken__factory } from '../typechain/factories/ScaleSwapToken__factory';

import { ScaleSwapToken } from '../typechain/ScaleSwapToken';

chai.use(solidity);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const SUPPLY = expandTo18Decimals(25_000_000);
let token: ScaleSwapToken;
let owner: Signer;
let bob: Signer;
let alice: Signer;

function expandTo18Decimals(n: number): BigNumber {
    return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

describe('Token ', () => {
    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0];
        bob = signers[1];
        alice = signers[2];
        token = await new ScaleSwapToken__factory(owner).deploy(SUPPLY, await owner.getAddress());
    });

    it('has a name', async () => {
        expect(await token.name()).to.be.equal("ScaleSwapToken");
    });

    it('has a symbol', async () => {
        expect(await token.symbol()).to.be.equal("SCA");
    });

    it('has 18 decimals', async () => {
        expect(await token.decimals()).to.be.equal(18);
    });

});

describe('transfer', () => {

    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0];
        bob = signers[1];
        alice = signers[2];
        token = await new ScaleSwapToken__factory(owner).deploy(SUPPLY, await owner.getAddress());
    });

    it('reverts when the sender does not have enough balance', async () => {
        await expect(
            token
                .connect(bob)
                .transfer(await alice.getAddress(), expandTo18Decimals(1)),
        ).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

    it('transfers the requested amount', async () => {
        let transferAmount = expandTo18Decimals(1);
        await token
            .connect(owner)
            .transfer(await alice.getAddress(), transferAmount);

        expect(await token.balanceOf(await alice.getAddress())).to.be.equal(transferAmount,);
    });

    it('emits transfer event', async () => {
        let transferAmount = expandTo18Decimals(1);
        await expect(
            token
                .connect(owner)
                .transfer(await alice.getAddress(), transferAmount),
        )
            .to.emit(token, 'Transfer')
            .withArgs(await owner.getAddress(), await alice.getAddress(), transferAmount);
    });

    it('reverts when the recipient is the zero address', async () => {
        let transferAmount = expandTo18Decimals(1);

        await expect(
            token.connect(owner).transfer(ZERO_ADDRESS, transferAmount),
        ).to.be.revertedWith('ERC20: transfer to the zero address');
    });
});

describe('burn', () => {

    before(async () => {
        const signers = await ethers.getSigners();
        owner = signers[0];
        bob = signers[1];
        alice = signers[2];
        token = await new ScaleSwapToken__factory(owner).deploy(SUPPLY, await owner.getAddress());
    });

    it('fails when not enough funds', async () => {
        await expect(
            token
                .connect(bob)
                .burn(expandTo18Decimals(1)),
        ).to.be.revertedWith('ERC20: burn amount exceeds balance');
    });

    it('decreases total supply', async () => {
        let burnAmount = expandTo18Decimals(1);
        await token.connect(owner).burn(burnAmount);
        expect(await token.totalSupply()).to.be.equal(SUPPLY.sub(burnAmount));
    });

    it('emits event', async () => {
        let burnAmount = expandTo18Decimals(1);
        await expect(token.connect(owner).burn(burnAmount))
            .to.emit(token, 'Transfer')
            .withArgs(await owner.getAddress(), ZERO_ADDRESS, burnAmount);
    });
});