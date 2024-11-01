// src/app/api/events/[id]/route.ts
import Event from '../../../../models/eventModel';
import dbConnect from '../../../../lib/mongodb';

// Connect to the database
await dbConnect(); // Ensure to await the connection

// Handle GET requests for a single event
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the ID from the params

  try {
    // Find the event by ID
    const event = await Event.findById(id);
    console.log(event);

    if (!event) {
      return new Response('Event not found', { status: 404 });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return new Response('Error fetching event', { status: 500 });
  }
}

// Handle PUT requests for updating a single event
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the ID from the params
  try {
    const { title, description, date, availableSeats } = await req.json();

    // Update the event by ID
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, availableSeats },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return new Response('Event not found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return new Response('Error updating event', { status: 500 });
  }
}
