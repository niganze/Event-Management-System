"use client"; // Mark this as a client component

import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import Layout from '../components/Layout';
import EventCard from '../components/EventCard';

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  availableSeats: number;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error)); // Add error handling
  }, []);

  // Function to handle updating available seats
  const handleUpdateSeats = (eventId: string, newAvailableSeats: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event._id === eventId ? { ...event, availableSeats: newAvailableSeats } : event
      )
    );
  };

  return (
    <Layout>
      <h1>Available Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map(event => (
          <EventCard key={event._id} event={event} onUpdateSeats={handleUpdateSeats} />
        ))}
      </div>
    </Layout>
  );
}
