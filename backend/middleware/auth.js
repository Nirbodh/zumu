const jwt = require("jsonwebtoken");

// Make sure this function is properly exported
const authMiddleware = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This should contain _id, email, and role
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err);
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;