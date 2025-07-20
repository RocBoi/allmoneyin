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
