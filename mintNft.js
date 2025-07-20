const { ethers } = require('ethers');
const fs = require('fs');

// 🌐 INFURA + WALLET
const INFURA_PROJECT_ID = '5ddda16ba7a94bb19f4fb118299cf9c2'; // from you
const PRIVATE_KEY = '0x18159ea779b7ba9a66f29e4eac9648b788859acfeccfb1a3a23f9986b7b32a3a'; // from you
const CONTRACT_ADDRESS = '0x54c23f8012a44b28c6b5dbaedba374f0bff3962a'; // from you

// 📦 ABI
const ABI = JSON.parse(fs.readFileSync('./contractABI.json', 'utf8'));

// 🖼️ Metadata for the NFT (hosted via IPFS)
const METADATA_URI = 'ipfs://bafybeifvzbn6y65psl4quvmpugknn4fnv4z42l5cqmk7dfgb4xgu4qdfke/metadata.json';

// 🔁 Mint function
async function mintNFT() {
  const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  console.log('🚀 Minting your NFT...');
  const tx = await contract.mintNFT(wallet.address, METADATA_URI);
  console.log('⛏️ Waiting for confirmation...');
  const receipt = await tx.wait();
  console.log('✅ NFT successfully minted! TX Hash:', receipt.transactionHash);
}

mintNFT().catch(console.error);
