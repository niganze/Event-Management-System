import { NextRequest, NextResponse } from 'next/server';
import Event from '../../../../models/eventModel';
import dbConnect from '../../../../lib/mongodb';

interface Params {
  id: string;
}

// Connect to the database
await dbConnect();

// Handle GET requests for a single event
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const event = await Event.findById(params.id);

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Error fetching event' },
      { status: 500 }
    );
  }
}

// Handle PUT requests for updating a single event
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const body = await request.json();
    const { title, description, date, availableSeats } = body;

    const updatedEvent = await Event.findByIdAndUpdate(
      params.id,
      { title, description, date, availableSeats },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Error updating event' },
      { status: 500 }
    );
  }
}
