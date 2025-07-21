// routes/nft.routes.js

import express from 'express';

const router = express.Router();

// Mock in-memory NFT storage
let nfts = [];

/**
 * POST /api/nfts/mint
 * Mint a new NFT (mock logic)
 */
router.post('/mint', (req, res) => {
  const { title, description, mediaUrl, ownerWallet } = req.body;

  if (!title || !description || !mediaUrl || !ownerWallet) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newNft = {
    id: nfts.length + 1,
    title,
    description,
    mediaUrl,
    ownerWallet,
    mintedAt: new Date(),
    listed: false,
    price: null,
  };

  nfts.push(newNft);

  res.status(201).json({ message: 'NFT minted successfully', nft: newNft });
});

/**
 * GET /api/nfts
 * Get all NFTs
 */
router.get('/', (req, res) => {
  res.json(nfts);
});

/**
 * GET /api/nfts/:id
 * Get an NFT by ID
 */
router.get('/:id', (req, res) => {
  const nft = nfts.find(n => n.id === parseInt(req.params.id));
  if (!nft) {
    return res.status(404).json({ message: 'NFT not found' });
  }
  res.json(nft);
});

/**
 * POST /api/nfts/list/:id
 * List an NFT for auction
 */
router.post('/list/:id', (req, res) => {
  const { price } = req.body;
  const nft = nfts.find(n => n.id === parseInt(req.params.id));

  if (!nft) {
    return res.status(404).json({ message: 'NFT not found' });
  }

  nft.listed = true;
  nft.price = price;

  res.json({ message: 'NFT listed for sale', nft });
});

export default router;
