"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import "../../../globals.css";

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
  const [formData, setFormData] = useState<Omit<Event, "_id">>({
    title: "",
    description: "",
    date: "",
    availableSeats: 0,
  });

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    if (res.ok) {
      const data: Event[] = await res.json();
      setEvents(data);
    } else {
      console.error("Failed to fetch events:", res.statusText);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", description: "", date: "", availableSeats: 0 });
  };

  const openEditModal = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      availableSeats: event.availableSeats,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({ title: "", description: "", date: "", availableSeats: 0 });
  };

  const handleEventAdded = async () => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchEvents();
      closeModal();
    } else {
      console.error("Failed to add event:", res.statusText);
    }
  };

  const handleEventUpdated = async () => {
    if (!currentEvent) return;

    const res = await fetch(`/api/events/${currentEvent._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      fetchEvents();
      closeEditModal();
    } else {
      console.error("Failed to update event:", res.statusText);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const res = await fetch(`/api/events`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchEvents();
    } else {
      console.error("Failed to delete event:", res.statusText);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Events</h2>
            <p className="text-3xl font-bold text-blue-500">{events.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">Seats Booked</h2>
            <p className="text-3xl font-bold text-green-500">
              {events.reduce((total, event) => total + event.availableSeats, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">Upcoming Events</h2>
            <p className="text-3xl font-bold text-purple-500">
              {events.filter((event) => new Date(event.date) > new Date()).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Bookings</h2>
            <p className="text-3xl font-bold text-red-500">
              {events.reduce((total, event) => total + event.availableSeats, 0)}
            </p>
          </div>
        </div>

        <button
          onClick={openModal}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-500 mb-6 transition duration-150"
        >
          Create Event
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-3 px-6 font-semibold">Title</th>
                <th className="py-3 px-6 font-semibold">Description</th>
                <th className="py-3 px-6 font-semibold">Date</th>
                <th className="py-3 px-6 font-semibold">Seats</th>
                <th className="py-3 px-6 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-t border-gray-200">
                  <td className="py-3 px-6">{event.title}</td>
                  <td className="py-3 px-6">{event.description}</td>
                  <td className="py-3 px-6">{event.date}</td>
                  <td className="py-3 px-6">{event.availableSeats}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => openEditModal(event)} className="text-blue-600 hover:underline mr-4">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteEvent(event._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition duration-200">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            {/* Add Event Form */}
          </div>
        </div>
      )}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full relative">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Add New Event</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEventAdded();
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Seats
          </label>
          <input
            type="number"
            value={formData.availableSeats}
            onChange={(e) =>
              setFormData({
                ...formData,
                availableSeats: +e.target.value,
              })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 ease-in-out mr-4"
          >
            Add Event
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 px-5 py-2 rounded-lg transition duration-200 ease-in-out"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{isEditModalOpen && currentEvent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full relative">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Event</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEventUpdated();
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Seats
          </label>
          <input
            type="number"
            value={formData.availableSeats}
            onChange={(e) =>
              setFormData({
                ...formData,
                availableSeats: +e.target.value,
              })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 ease-in-out mr-4"
          >
            Update Event
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 px-5 py-2 rounded-lg transition duration-200 ease-in-out"
            onClick={closeEditModal}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </AdminLayout>
  );
};

export default Admin;
