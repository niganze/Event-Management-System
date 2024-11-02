// import mongoose, { ConnectOptions } from 'mongoose';

// declare global {
//   interface Window {
//     mongoose: typeof mongoose;
//   }
// }

// const MONGODB_URI = "mongodb+srv://niganzealain:1@cluster0.upd7hil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// // Define an interface for the cached variable
// interface CachedMongoose {
//   conn: mongoose.Connection | null;
//   promise: Promise<mongoose.Connection> | null;
// }

// let cached: CachedMongoose | undefined = (global as { mongoose?: CachedMongoose }).mongoose;

// if (!cached) {
//   cached = (global as { mongoose: CachedMongoose }).mongoose = { conn: null, promise: null };
// }

// const options: ConnectOptions = {};

// async function dbConnect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, options)
//       .then((mongoose) => mongoose.connection) // Ensure you're accessing the connection
//       .catch((err) => {
//         console.error("MongoDB connection error:", err);
//         throw new Error("MongoDB connection failed.");
//       });
//   }

//   cached.conn = await cached.promise;
//   console.log("db connected");

//   return cached.conn;
// }

// export default dbConnect;


// import mongoose from "mongoose";

// const DATABASE_URL = process.env.DATABASE_URL;

// if (!DATABASE_URL) {
//   throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
// }

// let cached = global as unknown as { mongoose: typeof mongoose };

// // let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(DATABASE_URL!, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env.local');
}

let cached = globalThis as unknown as { 
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null; 
};

if (!cached) {
  cached = { conn: null, promise: null };
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

