import { NFTStorage, File } from 'nft.storage';
import fs from 'fs';
import path from 'path';
import mime from 'mime';

const NFT_STORAGE_API_KEY = 'd3d79a85.6ded03074b334cd4b42f59013f61163e';

const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

async function uploadFile(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  const file = new File([content], path.basename(filePath), { type });

  const cid = await client.storeBlob(file);
  console.log('✅ CID:', cid);
  console.log('🔗 IPFS URL: https://ipfs.io/ipfs/' + cid);
}

uploadFile('/storage/emulated/0/Download/rocboi_drop.mp4/rocboiquez - dumbbooty.mp4');
