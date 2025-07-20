const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config();

// Replace with your actual data
const PRIVATE_KEY = 'your-private-wallet-key'; // ⚠️ Secure this in .env file in production
const CONTRACT_ADDRESS = 'your-deployed-contract-address';
const ABI = JSON.parse(fs.readFileSync('./contractABI.json', 'utf8'));

// Metadata URL (from upload.js output)
const METADATA_URL = 'ipfs://bafy...'; // Replace with your actual metadata URI

async function mintNFT() {
  const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'); // or testnet URL
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const tx = await contract.mintNFT(wallet.address, METADATA_URL);
  console.log('⛏️ Minting transaction sent...');
  const receipt = await tx.wait();
  console.log('✅ NFT Minted! Transaction Hash:', receipt.transactionHash);
}

mintNFT().catch(console.error);
