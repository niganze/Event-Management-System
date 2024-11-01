"use client";
import '../../globals.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  availableSeats: number; // Ensure this matches the EventCard prop
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  // Function to update available seats
  const onUpdateSeats = (eventId: string, newAvailableSeats: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId ? { ...event, availableSeats: newAvailableSeats } : event
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome to the Event Management System</h1>
        <h2 className="text-2xl font-semibold mb-2">Available Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onUpdateSeats={onUpdateSeats} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
