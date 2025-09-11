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
    db = client.db();
    console.log('✅ MongoDB connected');

    app.get('/', (req, res) => res.send('API running…'));

    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  } catch (err) {
    console.error('Mongo error:', err);
  }
}
start();
