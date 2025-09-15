// location: project1/backend/routes/matches.js
const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const mongoose = require('mongoose');

// GET all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().sort({ startTime: 1 }).lean();
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// GET single match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('participants.userId', 'username email');
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch match' });
  }
});

// Create match (admin) - for now open; in production protect with admin check
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const match = new Match(data);
    await match.save();
    res.status(201).json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// Join match (authenticated)
router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    const matchId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(matchId)) return res.status(400).json({ error: 'Invalid match id' });

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check already joined
    const already = match.participants.some(p => p.userId.toString() === user._id.toString());
    if (already) return res.status(400).json({ error: 'Already joined' });

    // Check capacity
    if (match.currentParticipants >= match.maxParticipants) return res.status(400).json({ error: 'Match full' });

    // Check balance
    if (user.walletBalance < match.entryFee) return res.status(400).json({ error: 'Insufficient balance' });

    // Deduct entry fee
    user.walletBalance -= match.entryFee;
    await user.save();

    // Save participant
    match.participants.push({ userId: user._id, playerId: req.body.playerId || '' });
    match.currentParticipants += 1;
    await match.save();

    res.json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to join match' });
  }
});

module.exports = router;
