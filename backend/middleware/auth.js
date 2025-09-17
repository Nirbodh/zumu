const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔑 Authenticate normal users
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) return res.status(401).json({ error: "Invalid user" });

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// 🔑 Restrict to admin only
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

module.exports = { authenticateToken, adminMiddleware };