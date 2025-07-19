// upload.js
import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import 'dotenv/config';

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

if (!NFT_STORAGE_KEY) {
  console.error('❌ NFT_STORAGE_KEY missing in .env');
  process.exit(1);
}

const filePath = './dumbbooty.mp4';
const fileName = path.basename(filePath);
const mimeType = mime.getType(filePath);
const data = await fs.promises.readFile(filePath);
const file = new File([data], fileName, { type: mimeType });

const client = new NFTStorage({ token: NFT_STORAGE_KEY });

// ⏰ Drop Date: July 20, 2025, 12:00 PM EST
const dropDateEST = new Date('2025-07-20T12:00:00-04:00'); // Eastern Time
const dropTimestamp = Math.floor(dropDateEST.getTime() / 1000);

console.log('📤 Uploading to NFT.Storage...');

const metadata = await client.store({
  name: 'RocBoi Quez - DumbBooty',
  description: '🎬 Exclusive NFT drop of DumbBooty by RocBoi Quez — filmed by Ugly Visuals. Available to fans for 48 hours only.',
  animation_url: file, // Use animation_url for video/audio NFTs
  external_url: 'https://atlquez.com',
  background_color: '000000',
  attributes: [
    { trait_type: 'Artist', value: 'RocBoi Quez' },
    { trait_type: 'Videographer', value: 'Ugly Visuals' },
    { trait_type: 'Drop Type', value: 'Fan Reward' },
    { trait_type: 'Campaign', value: 'DumbBootyNFT' },
    { trait_type: 'Edition', value: '1 of 1' },
    { trait_type: 'Availability', value: '48 Hours Only' },
    { display_type: 'date', trait_type: 'Drop Date', value: dropTimestamp }
  ],
  properties: {
    format: mimeType,
    resolution: '1080p',
    campaign: 'DumbBootyNFT',
    artist: 'RocBoi Quez',
    videographer: 'Ugly Visuals'
  }
});

console.log('✅ Upload complete!');
console.log('🧾 Metadata URL:', metadata.url);
console.log('🖼️ IPFS CID:', metadata.ipnft);
