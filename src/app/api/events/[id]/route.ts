// src/app/api/events/[id]/route.ts
import Event from '../../../../models/eventModel';
import dbConnect from '../../../../lib/mongodb';

dbConnect();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; 

  
  const event = await Event.findById(id);
  console.log(event);
  
  if (!event) {
    return new Response('Event not found', { status: 404 });
  }

  return new Response(JSON.stringify(event), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params; 
    const { title, description, date, availableSeats } = await req.json();
  
    
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, availableSeats },
      { new: true } 
    );
  
    if (!updatedEvent) {
      return new Response('Event not found', { status: 404 });
    }
  
    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }