const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Match = require("../models/Match");
const Transaction = require("../models/Transaction");
const { adminMiddleware } = require("../middleware/auth");

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: "admin" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: "admin" },
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
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


// ✅ Get All Matches
router.get("/matches", adminMiddleware, async (req, res) => {
  try {
    const matches = await Match.find().sort({ createdAt: -1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Failed to load matches" });
  }
});

// ✅ Create Match
router.post("/matches", adminMiddleware, async (req, res) => {
  try {
    const { game, title, date, entryFee, prizePool, roomCode, roomPassword } = req.body;
    const match = new Match({
      game,
      title,
      date,
      entryFee,
      prizePool,
      roomCode,
      roomPassword,
      status: "upcoming",
    });
    await match.save();
    res.json(match);
  } catch (err) {
    console.error("Create match error:", err);
    res.status(500).json({ error: "Failed to create match" });
  }
});

// ✅ Submit Result
router.post("/matches/:id/result", adminMiddleware, async (req, res) => {
  try {
    const { winnerId } = req.body;
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });

    match.winner = winnerId;
    match.status = "completed";
    await match.save();

    res.json({ message: "Result submitted", match });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit result" });
  }
});

// ✅ Get Users
router.get("/users", adminMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users" });
  }
});

// ✅ Suspend User
router.post("/users/:id/suspend", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isSuspended = true;
    await user.save();

    res.json({ message: "User suspended" });
  } catch (err) {
    res.status(500).json({ error: "Failed to suspend user" });
  }
});

// ✅ Get Transactions
router.get("/transactions", adminMiddleware, async (req, res) => {
  try {
    const txns = await Transaction.find().populate("user").sort({ createdAt: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: "Failed to load transactions" });
  }
});

// ✅ Approve Transaction
router.post("/transactions/:id/approve", adminMiddleware, async (req, res) => {
  try {
    const txn = await Transaction.findById(req.params.id).populate("user");
    if (!txn) return res.status(404).json({ error: "Transaction not found" });

    txn.status = "approved";
    await txn.save();

    // Update user balance
    txn.user.walletBalance += txn.amount;
    await txn.user.save();

    res.json({ message: "Transaction approved", txn });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve transaction" });
  }
});

module.exports = router;
