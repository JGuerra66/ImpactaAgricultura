import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };


export const connectToDatabase = async () => {
  console.log(process.env)
  
  if (cached.conn) return cached.conn;

  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  try {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
      dbName: 'ImpAgro',
      bufferCommands: false,
    })

    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error
  }

  return cached.conn;
}