
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string; 
  password: string; 
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
});

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
