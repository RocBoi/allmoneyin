const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const API_KEY = 'd3d79a85.6ded03074b334cd4b42f59013f61163e'; // Your actual NFT.Storage API key
const videoPath = './rocboiquez_dumbbooty_.mp4'; // Updated video file name

async function main() {
  const client = new NFTStorage({ token: API_KEY });

  const content = await fs.promises.readFile(videoPath);
  const type = mime.getType(videoPath);
  const file = new File([content], path.basename(videoPath), { type });

  const metadata = await client.store({
    name: 'RocBoi Quez - DumbBooty (Compressed)',
    description: 'Official RocBoi Quez NFT - DumbBooty Compressed MP4',
    image: file, // The video file is stored as the image in metadata
  });

  console.log('✅ Metadata stored on IPFS:');
  console.log('🧾 Metadata URI:', metadata.url);
  console.log('🎞️ IPFS CID for video file:', metadata.data.image.href);
}

main();
