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
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null; // Do not render the modal if not open

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
              max={10} // Adjust the max based on your business logic
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

export default function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = (name: string, phone: string, seats: number) => {
    // Logic to handle the booking (e.g., API call)
    alert(`Booked ${seats} seat(s) for ${event.title} by ${name}.`);
    // Here you would typically call an API to book the seats
    // After booking, you could also update the available seats logic
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="text-gray-600">{event.description}</p>
      <p className="font-medium text-lg mt-2">Date: {event.date}</p>
      <p className="text-red-600 font-semibold">Seats Available: {event.availableSeats}</p>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        disabled={event.availableSeats === 0} // Disable button if no seats are available
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
