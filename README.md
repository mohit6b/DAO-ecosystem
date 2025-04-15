# DAO-ecosystem


This project implements a minimal DAO with staking, a governance token, and proposal voting using Hardhat and Solidity.

## Features
- **TestToken (ERC-20)**: Base token used for staking.
- **GovToken (ERC-20)**: Token rewarded for staking TestToken. Minted only by staking contract.
- **Staking**: Stake/UnStake base token to earn GovToken
- **DAO Governance**: Create proposals & Vote on proposals with GovToken balance as power

## Contracts
- `TestToken.sol` - ERC-20 base token
- `GovToken.sol` - ERC-20 governance token
- `Staking.sol` - Stake base token to earn GovToken
- `DAO.sol` - Create and vote on proposals

## Environment Setup
```bash
git clone https://github.com/mohit6b/DAO-ecosystem.git
cd DAO-ecosystem
npm install
npx hardhat compile
```

## Deploy Contracts
```bash
npm run deploy
```

## Run Tests
```bash
npx hardhat test
```

## Assumptions
- Base token is a mock ERC-20
- 1 base token staked = 1 GOV/day
- Voting power is based on live GovToken balance

## Sepolia Contract Links & Addresses
- [GovToken](https://sepolia.etherscan.io/address/0xD4DD1E5FEe92D42e8B6086987B7A1Cd799088a2f#code) - `0xD4DD1E5FEe92D42e8B6086987B7A1Cd799088a2f`
- [TestToken](https://sepolia.etherscan.io/address/0xb5D08B3B98E6d3642898E205443956f662721E4d#code) - `0xb5D08B3B98E6d3642898E205443956f662721E4d`
- [DAO](https://sepolia.etherscan.io/address/0x53fF81b322240C510c666D4104880347333eE10A#code) - `0x53fF81b322240C510c666D4104880347333eE10A`
- [Staking](https://sepolia.etherscan.io/address/0x0f5750E09F9729ddDeE5b3c030192AFEb787C732#code) - `0x0f5750E09F9729ddDeE5b3c030192AFEb787C732`

## Deployment Success Result
![Deployment](/assets/deploy.png)

## Test Success Result
![Tests](/assets/tests.png)

## How to test the Flow
1. Transfer some [TestToken](https://sepolia.etherscan.io/address/0xb5D08B3B98E6d3642898E205443956f662721E4d#code) from TestToken creator's address to the staker's address (Input: Staker's address & amount with 18 zeroes for decimals) with `transfer` function
2. Approve tokens for the [Staking](https://sepolia.etherscan.io/address/0x0f5750E09F9729ddDeE5b3c030192AFEb787C732#code) contract address from staker's address with `approve` function (Input: Stakering contract address & amount with 18 zeroes for decimals)
3. Stake tokens on the [Staking](https://sepolia.etherscan.io/address/0x0f5750E09F9729ddDeE5b3c030192AFEb787C732#code) contract with `stake` function (amount with 18 zeroes for decimals)
4. Call `claimGovToken` function on the [Staking](https://sepolia.etherscan.io/address/0x0f5750E09F9729ddDeE5b3c030192AFEb787C732#code) contract to claim GovToken as staking reward.
5. Create Proposal on the [DAO](https://sepolia.etherscan.io/address/0x53fF81b322240C510c666D4104880347333eE10A#code) contract. provide description and duration in the `createProposal` function.
6. Check proposal details with `proposal` function by entering id which is incremental starting from 0.
7. Vote on proposal using `vote` function (Input: proposal id & YES/NO).
8. Check proposal status with `getProposalStatus` function by entering id which is incremental starting from 0.
