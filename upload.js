const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function main() {
  const client = new NFTStorage({ token: API_KEY });
  const filePath = path.join(__dirname, "dumbbooty.mp4");
  const data = await fs.promises.readFile(filePath);

  console.log("Uploading video to NFT.Storage...");
  const metadata = await client.store({
    name: "RocBoi Quez - DumbBooty Video",
    description: "Exclusive NFT video drop by RocBoi Quez",
    image: new File([data], "dumbbooty.mp4", { type: "video/mp4" }),
  });

  console.log("Upload complete!");
  console.log("IPFS URL:", metadata.url);
}

main().catch(console.error);
