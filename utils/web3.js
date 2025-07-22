import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Browser with MetaMask
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // Server-side or no wallet
  const provider = new Web3.providers.HttpProvider(
   "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
  );
  web3 = new Web3(provider);
}

export default web3;
