// upload.js
import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import 'dotenv/config';

// Load your NFT.Storage API key from the .env file
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

// Ensure the key exists
if (!NFT_STORAGE_KEY) {
  console.error('❌ NFT_STORAGE_KEY is missing in .env');
  process.exit(1);
}

// File to upload
const filePath = './dumbbooty.mp4';
const fileName = path.basename(filePath);
const mimeType = mime.getType(filePath);

// Load file from disk
const data = await fs.promises.readFile(filePath);
const file = new File([data], fileName, { type: mimeType });

// Create NFT.Storage client
const client = new NFTStorage({ token: NFT_STORAGE_KEY });

// Upload
console.log('📤 Uploading to NFT.Storage...');
const metadata = await client.store({
  name: 'dumbbooty',
  description: 'Exclusive RocBoi Quez Video Drop',
  image: file
});

console.log('✅ Upload complete!');
console.log('🧾 Metadata URL:', metadata.url);
console.log('🖼️ IPFS CID:', metadata.ipnft);
