import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  seatsBooked: number;
}

const bookingSchema: Schema = new Schema({
  eventId: { type: mongoose.Types.ObjectId, ref: 'Event', required: true },
  seatsBooked: { type: Number, required: true },
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
