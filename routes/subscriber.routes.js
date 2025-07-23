const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: "Email required" });

  try {
    await sendEmail(email, "Welcome to GCode NFT Auctions", "Thanks for subscribing to NFT drops and auctions!");
    res.status(200).json({ msg: "Subscription confirmed" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send confirmation", error: err });
  }
});

module.exports = router;
