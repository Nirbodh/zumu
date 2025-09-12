// location: project1/backend/routes/admin.js
const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const User = require('../models/User');
const mongoose = require('mongoose');

// POST /api/admin/match/:id/result
// body: { results: [{ participantId, kills, rank }] }
router.post('/match/:id/result', async (req, res) => {
  try {
    const matchId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(matchId)) return res.status(400).json({ error: 'Invalid match id' });

    const { results } = req.body;
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    // Update participants with kills & rank
    for (const r of results) {
      const p = match.participants.id(r.participantId);
      if (p) {
        p.kills = Number(r.kills || 0);
        p.rank = Number(r.rank || 0);
      }
    }

    // Sort participants by rank ascending (1 is top)
    const participants = match.participants.map(p => p.toObject());
    participants.sort((a, b) => (a.rank || 9999) - (b.rank || 9999));

    // Prize distribution logic (example)
    const prizeDistribution = [];
    if (participants.length > 0) {
      // 1st 50%, 2nd 30%, 3rd 20% of totalPrize + kills*perKill
      const total = Number(match.totalPrize || 0);
      const perKill = Number(match.perKill || 0);

      const percentages = [0.5, 0.3, 0.2];
      for (let i = 0; i < Math.min(3, participants.length); i++) {
        const base = total * percentages[i];
        const killBonus = (participants[i].kills || 0) * perKill;
        const amount = Math.round(base + killBonus);
        prizeDistribution.push({ userId: participants[i].userId, amount });
      }
    }

    // Credit users
    for (const pd of prizeDistribution) {
      await User.findByIdAndUpdate(pd.userId, {
        $inc: { walletBalance: pd.amount, totalWinnings: pd.amount }
      });
    }

    match.status = 'completed';
    await match.save();

    res.json({ success: true, prizeDistribution });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit results' });
  }
});

module.exports = router;
