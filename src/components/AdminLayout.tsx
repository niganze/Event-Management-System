// src/components/AdminLayout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold text-center bg-gray-900">Admin Panel</div>
        <nav className="flex flex-col mt-4 space-y-2">
          <Link href="/admin" className="px-4 py-2 hover:bg-gray-700">Dashboard</Link>
          <Link href="/admin/events" className="px-4 py-2 hover:bg-gray-700">Manage Events</Link>
          <Link href="/admin/settings" className="px-4 py-2 hover:bg-gray-700">Settings</Link>
          <Link href="/admin/logout" className="px-4 py-2 hover:bg-gray-700">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, Admin</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
