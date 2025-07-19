import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.NFT_STORAGE_KEY
const videoPath = 'dumbbooty.mp4'
const thumbnailPath = 'dumbbooty_thumb.jpg'

async function main() {
  const videoFile = await fileFromPath(videoPath)
  const thumbFile = await fileFromPath(thumbnailPath)

  const metadata = await storeNFT(videoFile, thumbFile)

  console.log('✅ NFT Metadata Uploaded:')
  console.log(JSON.stringify(metadata, null, 2))
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}

async function storeNFT(video, thumbnail) {
  const client = new NFTStorage({ token: API_KEY })

  return await client.store({
    name: 'DumbBootyNFT',
    description: `RocBoi Quez NFT video drop. Directed by Ugly Visuals. Drops July 20, 2025 @ 12:00PM EST exclusively on atlQuez.com. Bidding closes 48 hours after launch.`,
    image: thumbnail,
    animation_url: video,
    external_url: 'https://www.atlquez.com',
    properties: {
      campaign: 'DumbBootyNFT',
      drop_date: '2025-07-20T12:00:00-05:00',
      auction_ends: '2025-07-22T12:00:00-05:00',
      videographer: 'Ugly Visuals',
      artist: 'RocBoi Quez',
      file_format: 'mp4',
      thumbnail_format: 'jpg'
    }
  })
}

main()
