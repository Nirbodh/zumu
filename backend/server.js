require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { v2 as cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const authRoutes = require('./routes/auth');
const matchesRoutes = require('./routes/matches');
const adminRoutes = require('./routes/admin');
const authenticateToken = require('./middleware/auth');
const Match = require('./models/Match');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI missing in .env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'match-proofs',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Match Proof Upload Endpoint
app.post('/api/matches/:id/proof',
  authenticateToken,
  upload.single('proofImage'),
  async (req, res) => {
    try {
      const match = await Match.findById(req.params.id);
      const participant = match.participants.find(
        p => p.userId.toString() === req.user.userId
      );
      
      if (!participant) {
        return res.status(404).json({ error: 'You have not joined this match' });
      }

      participant.proofImage = req.file.path;
      participant.proofSubmittedAt = new Date();
      
      // Optional: Update kills and rank if provided
      if (req.body.kills) participant.kills = req.body.kills;
      if (req.body.rank) participant.rank = req.body.rank;
      
      await match.save();

      res.json({ success: true, proofUrl: req.file.path });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Upload failed' });
    }
  }
);

// Root
app.get('/', (req, res) => res.send('API running…'));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));