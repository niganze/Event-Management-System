import { NextRequest, NextResponse } from 'next/server';

import bookingModel from '@/models/bookingModel';
import eventModel from '@/models/eventModel';
import dbConnect from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, seatsBooked } = body;

    // Validate request parameters
    if (!eventId || typeof seatsBooked !== 'number' || seatsBooked <= 0) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Connect to MongoDB using dbConnect
    await dbConnect();

    // Find the event by ID
    const event = await eventModel.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Check if there are enough seats available
    if (event.availableSeats < seatsBooked) {
      return NextResponse.json({ message: 'Not enough seats available' }, { status: 400 });
    }

    // Update available seats in the event
    event.availableSeats -= seatsBooked;
    await event.save();

    // Create a booking record
    const booking = new bookingModel({
      eventId: event._id,
      seatsBooked,
    });
    await booking.save();

    // Send success response
    return NextResponse.json({ message: 'Booking successful', booking }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
