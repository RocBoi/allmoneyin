// ethers-provider.js
import { ethers } from "ethers";

const INFURA_PROJECT_ID = "d13a1e95c6904ef5be8d143ccc533a53";
const network = "mainnet"; // Or "sepolia", "goerli", etc.

const provider = new ethers.JsonRpcProvider(`https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`);

export default provider;
