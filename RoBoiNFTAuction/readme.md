# RocBoi NFT Auction

This smart contract lets RocBoi Quez mint an exclusive NFT music video to the highest bidder within 48 hours.

## 💡 Features

- Bidding system (48hr countdown)
- Highest bidder wins the NFT
- Token URI linked to IPFS CID
- Powered by OpenZeppelin

## 🛠 Tech Stack

- Solidity (v0.8.20)
- Hardhat
- MetaMask
- GitHub
- IPFS for media

## 🚀 Deployment

```bash
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
