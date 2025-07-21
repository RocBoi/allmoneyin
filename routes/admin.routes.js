const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const NFT = require("../models/nft.model");
const Payment = require("../models/payment.model");
const { verifyToken, requireAdmin } = require("../middleware/auth.middleware");

// 🛡️ Protect all admin routes with admin verification
router.use(verifyToken, requireAdmin);

// 🧑‍💼 Get All Users (admin only)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Don't return passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🚫 Delete a User
router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// 🎨 Approve or Reject NFT
router.put("/nft/:id/approval", async (req, res) => {
  try {
    const { approved } = req.body;
    const nft = await NFT.findByIdAndUpdate(
      req.params.id,
      { approved },
      { new: true }
    );
    res.status(200).json({ message: "NFT approval updated", nft });
  } catch (err) {
    res.status(500).json({ error: "Failed to update NFT approval" });
  }
});

// 💰 Review Payments
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// 📊 Admin Dashboard Metrics (optional)
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNFTs = await NFT.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const approvedNFTs = await NFT.countDocuments({ approved: true });

    res.status(200).json({
      totalUsers,
      totalNFTs,
      approvedNFTs,
      totalPayments,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

module.exports = router;
