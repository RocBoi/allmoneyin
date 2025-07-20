// backend/server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

let bids = []; // Store bids in-memory (replace with DB for persistence)

// API to submit a new bid
app.post('/api/bid', (req, res) => {
  const { name, amount } = req.body;
  if (!name || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid bid data' });
  }
  bids.push({ name, amount });
  // Sort descending by amount
  bids.sort((a, b) => b.amount - a.amount);
  // Keep only top 10 bids
  bids = bids.slice(0, 10);

  // Broadcast updated leaderboard to all clients
  io.emit('leaderboardUpdate', bids);

  res.json({ success: true, bids });
});

// API to get current leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(bids);
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  // Send current leaderboard on new connection
  socket.emit('leaderboardUpdate', bids);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
