// web3-provider.js
import Web3 from "web3";

const INFURA_PROJECT_ID = "d13a1e95c6904ef5be8d143ccc533a53";
const network = "mainnet"; // Or "goerli", "sepolia", etc.

const providerUrl = `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;

const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

export default web3;
