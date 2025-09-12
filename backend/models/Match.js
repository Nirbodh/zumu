const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  playerId: { type: String },
  kills: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  prize: { type: Number, default: 0 },
  proofImage: { type: String },        // ✅ New field for proof image
  proofSubmittedAt: { type: Date }     // ✅ New field for submission time
}, { _id: true });

const matchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  game: { type: String, default: 'unknown' },
  entryFee: { type: Number, default: 0 },
  totalPrize: { type: Number, default: 0 },
  perKill: { type: Number, default: 0 },
  maxParticipants: { type: Number, default: 100 },
  currentParticipants: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  startTime: { type: Date },
  roomCode: { type: String },
  participants: [participantSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);