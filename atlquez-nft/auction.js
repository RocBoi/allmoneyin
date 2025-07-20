// Set 48-hour countdown from now
const countdownTarget = new Date(Date.now() + 48 * 60 * 60 * 1000).getTime();
const countdownEl = document.getElementById('countdown');

const timer = setInterval(() => {
  const now = new Date().getTime();
  const diff = countdownTarget - now;

  if (diff <= 0) {
    clearInterval(timer);
    countdownEl.innerHTML = "⏰ Auction Ended";
    document.getElementById("bidForm").style.display = "none";
    return;
  }

  const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${hrs}h ${mins}m ${secs}s`;
}, 1000);

// Bidding logic (temporary — upgrade with backend or wallet later)
let highest = 0;
let highestBidder = '';

document.getElementById('bidForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const bid = parseFloat(document.getElementById('bid').value);

  if (bid > highest) {
    highest = bid;
    highestBidder = name;
    document.getElementById('highestBid').innerText = `${name} - $${bid.toFixed(2)}`;
    alert("✅ Bid submitted!");
  } else {
    alert("❌ Bid must be higher than current highest.");
  }
});
let countdownTime = new Date().getTime() + (48 * 60 * 60 * 1000); // 48 hours from now

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownTime - now;
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdown").innerHTML = `${hours}h ${minutes}m ${seconds}s`;
  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "Auction Ended";
  }
}
setInterval(updateCountdown, 1000);

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("status").innerText = "Wallet connected!";
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  } else {
    alert("Install MetaMask to connect");
  }
}

function placeBid() {
  const bidAmount = document.getElementById("bidAmount").value;
  document.getElementById("status").innerText = `Bid of ${bidAmount} submitted (mock submission).`;
}
