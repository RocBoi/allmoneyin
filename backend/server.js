const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let bids = [];

app.post('/bid', (req, res) => {
  const { name, bidAmount } = req.body;
  if (!name || !bidAmount || isNaN(bidAmount)) return res.status(400).send("Invalid bid");
  bids.push({ name, bidAmount: parseFloat(bidAmount) });
  bids.sort((a, b) => b.bidAmount - a.bidAmount); // highest first
  res.sendStatus(200);
});

app.get('/leaderboard', (req, res) => {
  res.json(bids.slice(0, 10)); // top 10 bids
});

app.listen(port, () => {
  console.log(`🎯 NFT Auction backend running on http://localhost:${port}`);
});
