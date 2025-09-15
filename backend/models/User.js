// location: project1/backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  walletBalance: { type: Number, default: 0 },
  totalWinnings: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  matchesWon: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
