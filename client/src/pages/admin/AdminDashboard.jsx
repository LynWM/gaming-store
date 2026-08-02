import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, usersData, ordersData] = await Promise.all([
          api.getProducts(),
          api.getUsers(),
          api.getOrders(),
        ]);
        setProducts(productsData);
        setUsers(usersData);
        setOrders(ordersData);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

  return (
    <div className="min-h-screen bg-[#0B0712] p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin control center</h1>
          <p className="mt-2 text-sm text-gray-400">Overview of store performance.</p>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading stats...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Products" value={products.length} to="/admin/products" />
            <StatCard label="Users" value={users.length} to="/admin/users" />
            <StatCard label="Orders" value={orders.length} to="/admin/orders" />
            <StatCard label="Pending orders" value={pendingOrders} to="/admin/orders" />
          </div>
        )}

        <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
          <p className="text-sm text-gray-400">Total revenue (all orders)</p>
          <p className="mt-2 text-3xl font-bold">KSh {revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, to }) {
  return (
    <Link to={to} className="block rounded-2xl border border-[#231C30] bg-[#1B1625] p-6 transition hover:border-[#7C3AED]">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </Link>
  );
}