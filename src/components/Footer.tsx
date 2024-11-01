import React, { useState } from 'react';
import Link from 'next/link'; 

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">About Us</h3>
          <p className="text-gray-400">
            We are an Event Management System dedicated to connecting you with the best events. Discover, book, and manage your event experience seamlessly.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-blue-400 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-gray-400 hover:text-blue-400 transition duration-300">
                Events
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 mb-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-4 mt-8">
        <p className="text-sm text-gray-400">© 2024 Event Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
