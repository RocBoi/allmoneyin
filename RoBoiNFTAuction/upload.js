import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.NFT_STORAGE_KEY
const filePath = 'dumbbooty.mp4'

async function main() {
  const file = await fileFromPath(filePath)
  
  const metadata = await storeNFT(file)
  
  console.log('✅ NFT Metadata Uploaded:')
  console.log(JSON.stringify(metadata, null, 2))
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}

async function storeNFT(file) {
  const client = new NFTStorage({ token: API_KEY })

  return await client.store({
    name: 'DumbBootyNFT',
    description: 'Official NFT video drop from RocBoi Quez. Campaign: DumbBootyNFT. Videographer: Ugly Visuals. Drop date: July 20, 2025, 12:00PM EST.',
    image: file,
    properties: {
      campaign: 'DumbBootyNFT',
      drop_date: '2025-07-20T12:00:00-05:00',
      videographer: 'Ugly Visuals',
      artist: 'RocBoi Quez',
      file_format: 'mp4'
    }
  })
}

main()
