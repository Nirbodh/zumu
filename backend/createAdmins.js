// createAdmins.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User"); // ✅ Make sure path is correct

// 🔹 Admin list
const admins = [
  {
    username: "superadmin",
    email: "admin@zumu.com",
    password: "136651126612@Zumu",
  },
  {
    username: "backupadmin",
    email: "backup@zumu.com",
    password: "backupPass123@Zumu",
  },
];

// 🔧 Create Admins
async function createAdmins() {
  try {
    console.log("Loaded MONGODB_URI =", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    for (let adminData of admins) {
      const { username, email, password } = adminData;

      // যদি আগে থেকেই থাকে skip করবে
      let existing = await User.findOne({ email });
      if (existing) {
        console.log(`⚠️ Already exists: ${email}`);
        continue;
      }

      const hashed = await bcrypt.hash(password, 10);

      const admin = new User({
        username,
        email,
        password: hashed,
        role: "admin",
        walletBalance: 0,
        totalWinnings: 0,
        matchesPlayed: 0,
        matchesWon: 0,
      });

      await admin.save();
      console.log(`✅ Admin created: ${email}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admins:", err);
    process.exit(1);
  }
}

createAdmins();
