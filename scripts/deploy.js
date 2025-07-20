const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const RocBoiNFTAuction = await hre.ethers.getContractFactory("RocBoiNFTAuction");

  const cid = "bafybeigzgx6gvjnqw7xwxnvazddxdyoseolnjydkl7xon3t25vddgn6fcq";
  const contract = await RocBoiNFTAuction.deploy(deployer.address, cid);

  await contract.deployed();

  console.log("RocBoiNFTAuction deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
