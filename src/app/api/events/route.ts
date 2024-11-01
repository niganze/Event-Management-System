// src/app/api/events/route.ts
import Event from '../../../models/eventModel';
import dbConnect from '../../../lib/mongodb';

// Connect to the database
dbConnect();

// Handle GET requests
export async function GET() {
  const events = await Event.find();
  console.log(events);
  
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Handle POST requests
export async function POST(req: Request) {
  const { title, description, date, availableSeats } = await req.json();
  const event = new Event({ title, description, date, availableSeats });
  await event.save();
  return new Response(JSON.stringify(event), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Handle DELETE requests
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) {
    return new Response('Event not found', { status: 404 });
  }
  return new Response(JSON.stringify(deletedEvent), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}



// Handle PUT requests for updating an event
export async function PUT(req: Request) {
  const { id, title, description, date, availableSeats } = await req.json();
  
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
}

// Handle unsupported methods
export async function OPTIONS() {
  return new Response('Method Not Allowed', { status: 405 });
}