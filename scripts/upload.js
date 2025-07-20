require('dotenv').config();
const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function main() {
  const client = new NFTStorage({ token: API_KEY });

  const filePath = './dumbbooty.mp4';
  const content = await fs.promises.readFile(filePath);
  const file = new File([content], 'dumbbooty.mp4', { type: 'video/mp4' });

  const metadata = await client.store({
    name: 'DumbBootyNFT',
    description: 'Exclusive fan NFT drop for DumbBooty.mp4\nCampaign: DumbBootyNFT\nVideographer: Ugly Visuals\nDrop Date: July 20, 2025 12:00pm EST',
    image: file,
    properties: {
      campaign: 'DumbBootyNFT',
      videographer: 'Ugly Visuals',
      drop_date: '2025-07-20T12:00:00-05:00'
    }
  });

  console.log('✅ Metadata stored!');
  console.log('📦 IPFS URL:', metadata.url);
  console.log('🆔 CID:', metadata.ipnft);
}

main().catch((err) => {
  console.error('❌ Error uploading:', err);
});
