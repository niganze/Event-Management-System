import React, { useState } from 'react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  availableSeats: number; 
}

interface EventCardProps {
  event: Event;
  onUpdateSeats: (eventId: string, newAvailableSeats: number) => void; 
}

const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, phone: string, seats: number) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, phone, seats); 
    onClose(); 
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Book Your Seats</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Number of Seats</label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              min="1"
              max={10} 
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-black py-2 px-4 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function EventCard({ event, onUpdateSeats }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = async (name: string, phone: string, seats: number) => {
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event._id,
          seatsBooked: seats, 
        }),
      });

      if (response.ok) {
         await response.json();
        alert(`Booked ${seats} seat(s) for ${event.title} by ${name}.`);

        // Update available seats
        const newAvailableSeats = event.availableSeats - seats;
        onUpdateSeats(event._id, newAvailableSeats);
      } else {
        alert('Failed to book seats. Please try again.');
      }
    } catch (error) {
      console.error('Error booking seats:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-lg bg-white transition transform hover:scale-105">
  <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
  <p className="text-gray-600 mb-4">{event.description}</p>
  <p className="font-medium text-lg text-gray-700">Date: <span className="font-semibold">{event.date}</span></p>
  <p className="text-red-600 font-semibold mt-1">Seats Available: <span className="text-black">{event.availableSeats}</span></p>
  
  <button 
    onClick={() => setIsModalOpen(true)}
    className={`mt-4 py-2 px-4 rounded transition duration-200 
      ${event.availableSeats > 0 ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} 
    disabled={event.availableSeats === 0}
  >
    {event.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
  </button>

  <BookingModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onSubmit={handleBooking}
  />
</div>

  );
}
