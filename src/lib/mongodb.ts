
import mongoose from 'mongoose';

declare global {
  interface Window {
    mongoose: any;
  }
}

const MONGODB_URI = "mongodb+srv://niganzealain:1@cluster0.upd7hil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
const options: mongoose.ConnectOptions = {};

  
  async function dbConnect() {
    if (cached.conn) return cached.conn;
  
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI, options)
        .then((mongoose) => mongoose)
        .catch((err) => {
          console.error("MongoDB connection error:", err);
          throw new Error("MongoDB connection failed.");
        });
    }
    cached.conn = await cached.promise;
    console.log("db connected");
  
    return cached.conn;
  }
  
export default dbConnect