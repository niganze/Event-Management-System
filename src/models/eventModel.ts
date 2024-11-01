import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  availableSeats: number;
}

const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
