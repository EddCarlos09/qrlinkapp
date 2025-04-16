import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="bg-green-100 w-64 min-h-full p-4 shadow-md">
    <nav className="space-y-4">
      <Link to="/dashboard" className="block text-green-800 hover:underline">Dashboard</Link>
      <Link to="/dashboard/settings" className="block text-green-800 hover:underline">Configuraciones</Link>
    </nav>
  </aside>
);

export default Sidebar;
