# DAO-ecosystem


This project implements a minimal DAO with staking, a governance token, and proposal voting using Hardhat and Solidity.

## Features
- **GovToken (ERC-20)**: Minted only by staking contract
- **Staking**: Stake base token to earn GovToken
- **DAO Governance**: Vote on proposals with GovToken balance

## Contracts
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

## Sepolia Contract Addresses
- [GovToken](https://sepolia.etherscan.io/address/0xD4DD1E5FEe92D42e8B6086987B7A1Cd799088a2f#code) - `0xD4DD1E5FEe92D42e8B6086987B7A1Cd799088a2f`
- [TestToken](https://sepolia.etherscan.io/address/0xb5D08B3B98E6d3642898E205443956f662721E4d#code) - `0xb5D08B3B98E6d3642898E205443956f662721E4d`
- [DAO](https://sepolia.etherscan.io/address/0x53fF81b322240C510c666D4104880347333eE10A#code) - `0x53fF81b322240C510c666D4104880347333eE10A`
- [Staking](https://sepolia.etherscan.io/address/0x0f5750E09F9729ddDeE5b3c030192AFEb787C732#code) - `0x0f5750E09F9729ddDeE5b3c030192AFEb787C732`


