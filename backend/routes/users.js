const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // Changed from authenticateToken to authMiddleware

// ✅ Get profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ✅ Update wallet (example)
router.post("/wallet/add", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);
    user.walletBalance += Number(amount);
    await user.save();
    res.json({ walletBalance: user.walletBalance });
  } catch (err) {
    res.status(500).json({ error: "Failed to update wallet" });
  }
});

module.exports = router;