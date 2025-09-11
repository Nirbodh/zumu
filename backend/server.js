import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// নিশ্চিত করুন Render Dashboard → Environment Variables এ MONGO_URI দেওয়া আছে
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function start() {
  try {
    await client.connect();
    db = client.db(); // চাইলে নির্দিষ্ট DB নাম দিন: client.db('zumu')
    console.log('✅ MongoDB connected');

    // টেস্ট রুট
    app.get('/', (req, res) => res.send('API running…'));

    // ভবিষ্যতে API উদাহরণ
// app.get('/api/matches', async (req, res) => {
    //   const matches = await db.collection('matches').find().toArray();
    //   res.json(matches);
    // });

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
