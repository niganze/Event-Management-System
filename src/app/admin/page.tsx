"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import '../globals.css';

// Define the Event type
interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  availableSeats: number;
}

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Omit<Event, '_id'>>({
    title: '',
    description: '',
    date: '',
    availableSeats: 0,
  });

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    if (res.ok) {
      const data: Event[] = await res.json();
      setEvents(data);
    } else {
      console.error('Failed to fetch events:', res.statusText);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when component mounts
  }, []);

  // Open and close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null); // Reset current event
    setFormData({ title: '', description: '', date: '', availableSeats: 0 }); // Reset form
  };

  const openEditModal = (event: Event) => {
    setCurrentEvent(event);
    setFormData({ title: event.title, description: event.description, date: event.date, availableSeats: event.availableSeats });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentEvent(null); // Reset current event
    setFormData({ title: '', description: '', date: '', availableSeats: 0 }); // Reset form
  };

  const handleEventAdded = async () => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchEvents();
      closeModal(); // Close modal after event is added
    } else {
      console.error('Failed to add event:', res.statusText);
    }
  };

  const handleEventUpdated = async () => {
    if (!currentEvent) return;

    const res = await fetch(`/api/events/${currentEvent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchEvents();
      closeEditModal(); // Close edit modal after event is updated
    } else {
      console.error('Failed to update event:', res.statusText);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const res = await fetch(`/api/events`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchEvents(); // Refresh the event list
    } else {
      console.error('Failed to delete event:', res.statusText);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Card showing total number of events */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold">Total Events: {events.length}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold">total booked : {events.length}</h2>
        </div>

        <div className="grid gap-6">
          {/* Create Event Button */}
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 transition-transform transform hover:scale-105"
            onClick={openModal}
          >
            Create Event
          </button>

          {/* Events List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Event Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">Title</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">Description</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">Date</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold border-b">Available Seats</th>
                    <th className="py-3 px-4 text-center text-gray-700 font-semibold border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event._id}>
                      <td className="py-3 px-4 border-b">{event.title}</td>
                      <td className="py-3 px-4 border-b">{event.description}</td>
                      <td className="py-3 px-4 border-b">{event.date}</td>
                      <td className="py-3 px-4 border-b">{event.availableSeats}</td>
                      <td className="py-3 px-4 text-center border-b">
                        <button 
                          className="text-blue-500 hover:text-blue-600 mr-2 transition-colors"
                          onClick={() => openEditModal(event)} // Open edit modal with event data
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-600 transition-colors"
                          onClick={() => handleDeleteEvent(event._id)} // Delete event
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for Event Form */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleEventAdded(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Date</label>
                  <input 
                    type="date" 
                    value={formData.date} 
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Available Seats</label>
                  <input 
                    type="number" 
                    value={formData.availableSeats} 
                    onChange={(e) => setFormData({ ...formData, availableSeats: +e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Event</button>
                <button 
                  type="button" 
                  className="text-red-500 mt-4 ml-4" 
                  onClick={closeModal}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Editing Event */}
        {isEditModalOpen && currentEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleEventUpdated(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Date</label>
                  <input 
                    type="date" 
                    value={formData.date} 
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Available Seats</label>
                  <input 
                    type="number" 
                    value={formData.availableSeats} 
                    onChange={(e) => setFormData({ ...formData, availableSeats: +e.target.value })} 
                    className="border border-gray-300 p-2 rounded w-full" 
                    required 
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Event</button>
                <button 
                  type="button" 
                  className="text-red-500 mt-4 ml-4" 
                  onClick={closeEditModal}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Admin;
