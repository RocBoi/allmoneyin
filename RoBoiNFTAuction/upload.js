import 'dotenv/config';
const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function main() {
  const client = new NFTStorage({ token: API_KEY });
  const filePath = path.join(__dirname, "dumbbooty.mp4");
  const data = await fs.promises.readFile(filePath);

  const metadata = await client.store({
    name: "DumbBooty",
    description: "Exclusive MP4 NFT by RocBoi Quez",
    image: new File([data], "dumbbooty.mp4", { type: "video/mp4" }),
  });

  console.log("✅ Upload complete!");
  console.log("🌀 IPFS Metadata URL:", metadata.url);
  console.log("📦 IPFS CID:", metadata.ipnft);
}

main().catch(console.error);
