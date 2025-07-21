import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import auctionRoutes from './routes/auction.routes.js';
import userRoutes from './routes/user.routes.js';
import nftRoutes from './routes/nft.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auctions', auctionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/nfts', nftRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('🎯 Welcome to the GCode NFT Auction API!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GCode NFT Auction Server running at http://localhost:${PORT}`);
});
const uploadRoutes = require('./routes/upload.routes');
app.use('/upload', uploadRoutes);
