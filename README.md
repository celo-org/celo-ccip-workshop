# NFT Minting from Celo to Ethereum Using Chainlink CCIP

This project demonstrates how to mint an NFT on the Sepolia network from the Celo Alfajores testnet using Chainlink's Cross-Chain Interoperability Protocol (CCIP).

## Overview

The project includes three main smart contracts:

- **SourceMinter:** Deployed on Celo Alfajores, sends cross-chain mint requests.
- **DestinationMinter:** Deployed on Sepolia, receives cross-chain mint requests and triggers the minting process.
- **CeloNFT:** Deployed on Sepolia, the actual NFT contract.

## Prerequisites

- Node.js and npm installed
- Hardhat installed
- A wallet with testnet funds on both Alfajores and Sepolia
- Chainlink tokens for transaction fees on Alfajores (available from the [Chainlink Faucet](https://faucets.chain.link/))

## Setup

- Clone the repository and navigate to the project directory.

- Install dependencies:

```bash
cd packages/hardhat
npm install
```

- Create a `.env` file from the template and fill in your private key and API keys:

```bash
cp .env.template .env
```

Edit the .env file and add your details:

```text
PRIVATE_KEY="your-private-key"
CELOSCAN_API_KEY="your-celoscan-api-key"
ETHERSCAN_API_KEY="your-etherscan-api-key"
```

## Deployment

- Deploy SourceMinter on Alfajores

Run the deployment script:

```bash
npx hardhat run scripts/1.deploy.source.alfajores.js --network alfajores
```

Copy the deployed contract address and add it to `addresses.txt` under SourceMinter (alfajores).

- Deploy CeloNFT on Sepolia

Run the deployment script:

```bash
npx hardhat run scripts/2.deploy.celonft.sepolia.js --network sepolia
```

Copy the deployed contract address and add it to `addresses.txt` under CeloNFT (Sepolia).

- Deploy DestinationMinter on Sepolia

Update the `celoNFTAddress` variable in `scripts/3.deploy.destination.sepolia.js` with the address of the deployed `CeloNFT` contract. Then run the deployment script:

```bash
npx hardhat run scripts/3.deploy.destination.sepolia.js --network sepolia
```

Copy the deployed contract address and add it to `addresses.txt` under DestinationMinter (Sepolia).

- Transfer Ownership of CeloNFT

Update the `newOwner` variable in `scripts/4.transfer-ownership.sepolia.js` with the `address` of the deployed `DestinationMinter` contract. Then run the script:

```bash
npx hardhat run scripts/4.transfer-ownership.sepolia.js --network sepolia
```

### Note

After transferring ownership, ensure you send LINK tokens to the SourceMinter contract. These tokens will be used to pay the fees for CCIP transactions.

- Mint an NFT from Alfajores

Update the necessary variables in `scripts/5.mint-nft.alfajores.js` from `addresses.txt`, then run the script to mint an NFT:

```bash
npx hardhat run scripts/5.mint-nft.alfajores.js --network alfajores
```

## Notes

- Ensure you have enough LINK tokens in your wallet on the Alfajores network for the cross-chain fee. You can get test LINK tokens from the [Chainlink Faucet](https://faucets.chain.link/).
- Keep track of your contract addresses in the `addresses.txt` file for reference during interactions.
