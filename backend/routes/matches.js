const express = require("express");
const router = express.Router();
const Match = require("../models/Match");
const authMiddleware = require("../middleware/auth"); // Make sure this path is correct

// ✅ Get all matches
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().populate("participants.userId", "username");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// ✅ Join a match
router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });

    const already = match.participants.some(
      (p) => p.userId.toString() === req.user._id.toString()
    );
    if (already) return res.status(400).json({ error: "Already joined" });

    match.participants.push({ userId: req.user._id });
    await match.save();

    res.json({ message: "Joined successfully", match });
  } catch (err) {
    res.status(500).json({ error: "Join failed" });
  }
});

// ✅ Match details (roomCode only if joined)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).lean();
    if (!match) return res.status(404).json({ error: "Match not found" });

    const isJoined = match.participants.some(
      (p) => p.userId.toString() === req.user._id.toString()
    );
    if (!isJoined) {
      delete match.roomCode;
      delete match.roomPassword;
    }

    res.json(match);
  } catch (err) {
    res.status(500).json({ error: "Failed to load match" });
  }
});

module.exports = router;