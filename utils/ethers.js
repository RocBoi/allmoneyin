import { ethers } from "ethers";

let provider;
let signer;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
} else {
  provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
  signer = provider.getSigner(); // Will be null if not connected
}

export { provider, signer };
