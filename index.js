import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nftVideoRoutes from './routes/nftvideo.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/nft', nftVideoRoutes); // NFT Video Streaming

app.get('/', (req, res) => {
  res.send('<h1>🎧 Welcome to GCode NFT Auction Platform</h1><a href="/nft/NFTvideoBid">🎥 View DumbBootyNFT</a>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 GCode NFT Auction Server running at http://localhost:${PORT}`);
});
