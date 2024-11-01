import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <header className="bg-blue-600 p-4 text-white">
      <nav>
        <Link href="/events">Events</Link>
        <Link href="/admin" className="ml-4">Admin</Link>
      </nav>
    </header>
    <main className="p-4">{children}</main>
  </div>
);

export default Layout;
