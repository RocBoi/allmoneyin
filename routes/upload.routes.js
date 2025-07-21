const express = require("express");
const multer = require("multer");
const path = require("path");
// Uncomment if using IPFS
// const { create } = require('ipfs-http-client');

const router = express.Router();

// Configure local storage (can replace with cloud or IPFS logic)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Local upload route (use /upload/media)
router.post("/media", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      message: "File uploaded successfully",
      path: filePath,
      filename: req.file.filename,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Optional: IPFS Upload (replace or add endpoint)
// router.post("/ipfs", upload.single("file"), async (req, res) => {
//   try {
//     const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });
//     const file = req.file;

//     if (!file) return res.status(400).json({ error: "No file uploaded" });

//     const result = await ipfs.add(file.buffer);

//     res.json({
//       message: "Uploaded to IPFS",
//       hash: result.path,
//       url: `https://ipfs.io/ipfs/${result.path}`,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "IPFS upload failed" });
//   }
// });

module.exports = router;
import multer from 'multer';
import path from 'path';

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File filter for images/videos/audio
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mp3|wav/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
