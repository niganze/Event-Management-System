"use client";
import '../../globals.css';

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

 
  const onUpdateSeats = (eventId: string, newAvailableSeats: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId ? { ...event, availableSeats: newAvailableSeats } : event
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <div className="p-8 flex-grow">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to the Event Management System</h1>
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Available Events</h2>
      <p className='text-lg mb-8 text-center text-gray-600 max-w-3xl mx-auto'>
        At our event management system, we believe in the mantra, <strong>'Your Event, Our Expertise.'</strong> We strive to provide seamless events that create unforgettable memories, transforming your ideas into remarkable experiences. Our approach is simple: we plan, manage, and celebrate with you, ensuring that every detail matters. With our platform, enjoy effortless event management at your fingertips, connecting people and crafting moments, one event at a time. It's your vision, and our mission is to elevate your events with ease. Simplifying the process while amplifying experiences, we’re dedicated to making your event dreams a reality—from concept to celebration, we’ve got you covered!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} onUpdateSeats={onUpdateSeats} />
        ))}
      </div>
    </div>
    <Footer />
  </div>
  
  );
}
