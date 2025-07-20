// ~/gcode-projects/atlquez-nft/scripts/uploadToIPFS.js

import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import path from 'path'
import mime from 'mime'

const API_KEY = process.env.NFT_STORAGE_API_KEY
const client = new NFTStorage({ token: API_KEY })

async function storeVideo() {
  const filePath = './assets/rocboiquez_dumbbooty_compressed.mp4'
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  const file = new File([content], path.basename(filePath), { type })

  const metadata = await client.store({
    name: 'RocBoi Quez - Dumb Booty (NFT Edition)',
    description: 'Exclusive 48hr auction video NFT by RocBoi Quez.',
    image: file
  })

  console.log('Metadata URI:', metadata.url)
  fs.writeFileSync('./metadata/ipfs_hash.txt', metadata.url)
}

storeVideo()
