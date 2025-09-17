const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  role: { type: String, default: "user" }, // 🔹 new field
  walletBalance: { type: Number, default: 0 },
  totalWinnings: { type: Number, default: 0 },
  matchesPlayed: { type: Number, default: 0 },
  matchesWon: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
