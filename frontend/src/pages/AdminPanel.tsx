import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-genzmart-blue text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">GenZmart Admin Panel</h1>
        <nav className="space-x-6">
          <Link to="/admin/products" className="hover:underline">Products</Link>
          <Link to="/admin/orders" className="hover:underline">Orders</Link>
          <Link to="/admin/users" className="hover:underline">Users</Link>
          <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </header>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
