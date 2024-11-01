// src/models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string; // New field for username
  password: string; // New field for password
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // Ensure this is unique
  password: { type: String, required: true }, // Password field
});

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
