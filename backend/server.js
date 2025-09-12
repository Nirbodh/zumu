import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function start() {
  try {
    await client.connect();
    db = client.db('zumu'); // চাইলে আলাদা DB নাম ব্যবহার করুন
    console.log('✅ MongoDB connected');

    // --- টেস্ট রুট ---
    app.get('/', (req, res) => res.send('API running…'));

    // --- ম্যাচ লিস্ট রুট ---
    app.get('/api/matches', async (req, res) => {
      try {
        const matches = await db.collection('matches').find().toArray();
        res.json(matches);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch matches' });
      }
    });

    // --- ম্যাচে জয়েন রুট ---
    app.post('/api/join', async (req, res) => {
      const { userId, matchId } = req.body;
      await db.collection('participants').insertOne({ userId, matchId });
      res.json({ success: true });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ Mongo error:', err);
    process.exit(1);
  }
}

start();
