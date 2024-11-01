// src/components/Navbar.tsx
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);
    };

    const timerId = setInterval(updateTime, 1000); // Update time every second
    updateTime(); // Initial call to set time immediately

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">Event Management</Link>
        
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for events..."
            className="p-2 rounded border border-gray-300 w-full"
          />
        </div>

        <div className="flex items-center">
          <span className="text-white mr-4">{currentTime}</span>
          <Link href="/login" className="text-white mx-2 hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
}
