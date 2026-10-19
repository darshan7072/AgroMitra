import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000 // fail fast if not reachable
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to database at ${config.mongoUri}`);
    console.warn(`[MongoDB Guidance] Please ensure MongoDB is running locally or set MONGODB_URI in backend/.env`);
    console.warn(`[MongoDB Atlas Setup Guide]:`);
    console.warn(`  1. Create a free cluster on https://cloud.mongodb.com`);
    console.warn(`  2. Create a database user & whitelist your IP (or 0.0.0.0/0 for dev)`);
    console.warn(`  3. In backend/.env, set: MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/agromitra`);
    console.warn(`  Original error: ${error.message}`);
    return null;
  }
};

export const disconnectDB = async () => {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
  console.log('[MongoDB] Disconnected.');
};
