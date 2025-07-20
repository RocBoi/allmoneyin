const express = require('express');
const cors = require('cors');
const app = express();

let leaderboard = [];

app.use(cors());
app.use(express.json());

app.post('/bids', (req, res) => {
  const { name, bid } = req.body;
  leaderboard.push({ name, bid });
  leaderboard.sort((a, b) => b.bid - a.bid);
  res.status(201).send({ message: 'Bid received!' });
});

app.get('/bids', (req, res) => {
  res.send(leaderboard.slice(0, 10)); // Top 10 bids
});

app.listen(3000, () => console.log('Leaderboard API running on port 3000'));
