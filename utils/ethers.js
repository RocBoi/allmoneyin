import { ethers } from "ethers";

let provider;
let signer;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
} else {
  provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/d13a1e95c6904ef5be8d143ccc533a53*); 
  signer = provider.getSigner(); // Will be null if not connected
}

export { provider, signer };
