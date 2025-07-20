require("dotenv").config();
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const metadata = JSON.parse(fs.readFileSync("./metadata/metadata.json", "utf8"));
  const metadataCID = "QmWUoHmosBfPk52syrVc5em8HiuncaZRcyTPBMZqpSaWmG"; // Already uploaded
  const tokenURI = `ipfs://${metadataCID}`;

  const RocBoiNFT = await ethers.getContractFactory("RocBoiNFT");
  const contract = await RocBoiNFT.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

  const mintTx = await contract.mint(tokenURI);
  await mintTx.wait();

  console.log("NFT Minted! Token URI:", tokenURI);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
