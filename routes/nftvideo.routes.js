import express from 'express';
const router = express.Router();

// Stream video from IPFS directly
router.get('/NFTvideoBid', (req, res) => {
  const videoURL = 'https://bafybeiclbirhq4zwyska56flarpqde73pckwsdiemc4gju2ab27iz2kene.ipfs.w3s.link/';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>DumbBootyNFT - NFT Auction</title>
      <style>
        body { background-color: #000; color: #fff; font-family: sans-serif; text-align: center; padding: 2rem; }
        video { width: 90%; max-width: 900px; height: auto; border-radius: 12px; }
        a { color: #0ff; text-decoration: none; font-size: 1.2rem; }
      </style>
    </head>
    <body>
      <h1>🎥 DumbBootyNFT Video Auction</h1>
      <video controls autoplay muted>
        <source src="${videoURL}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <br />
      <a href="/">⬅️ Back to Home</a>
    </body>
    </html>
  `;
  res.send(html);
});

export default router;
