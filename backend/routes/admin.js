const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Match = require("../models/Match");
const authMiddleware = require("../middleware/auth");

// ✅ Admin Stats Route
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    console.log("🔑 Decoded user:", req.user);

    // Find admin by email
    const admin = await User.findOne({ email: req.user.email });

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized - Admin only" });
    }

    const users = await User.countDocuments();
    const matches = await Match.countDocuments();
    const revenue = matches * 10; // example calculation

    res.json({ users, matches, revenue });
  } catch (err) {
    console.error("❌ Stats route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add more admin routes as needed
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.user.email });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized - Admin only" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("❌ Users route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a simple test route
router.get("/test", authMiddleware, (req, res) => {
  res.json({ message: "Admin route is working!" });
});

module.exports = router;