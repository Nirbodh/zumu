const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Match = require("../models/Match");
const authMiddleware = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Admin Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Admin Stats Route
router.get("/stats", authMiddleware, async (req, res) => {
  try {
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

// ✅ Get all users
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

// ✅ Create match
router.post("/matches", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.user.email });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized - Admin only" });
    }

    const { title, game, entryFee, totalPrize, perKill, maxParticipants, startTime, roomCode } = req.body;
    
    const match = new Match({
      title,
      game: game || "freefire",
      entryFee: entryFee || 0,
      totalPrize: totalPrize || 0,
      perKill: perKill || 0,
      maxParticipants: maxParticipants || 100,
      startTime: startTime || new Date(),
      roomCode: roomCode || "",
      status: "upcoming"
    });

    await match.save();
    res.json(match);
  } catch (err) {
    console.error("❌ Create match error:", err);
    res.status(500).json({ error: "Failed to create match" });
  }
});

// ✅ Get all matches for admin
router.get("/matches", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.user.email });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized - Admin only" });
    }

    const matches = await Match.find().populate("participants.userId", "username");
    res.json(matches);
  } catch (err) {
    console.error("❌ Get matches error:", err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// ✅ Update match result
router.post("/matches/:id/result", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.user.email });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized - Admin only" });
    }

    const { participants } = req.body;
    const match = await Match.findById(req.params.id);
    
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // Update participants with results
    match.participants = participants;
    match.status = "completed";
    await match.save();

    res.json({ message: "Result updated successfully", match });
  } catch (err) {
    console.error("❌ Update result error:", err);
    res.status(500).json({ error: "Failed to update result" });
  }
});

// ✅ Suspend user
router.post("/users/:id/suspend", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.user.email });
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized - Admin only" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add suspended field to user model first
    user.suspended = true;
    await user.save();

    res.json({ message: "User suspended successfully" });
  } catch (err) {
    console.error("❌ Suspend user error:", err);
    res.status(500).json({ error: "Failed to suspend user" });
  }
});

// Add a simple test route
router.get("/test", authMiddleware, (req, res) => {
  res.json({ message: "Admin route is working!" });
});

module.exports = router;