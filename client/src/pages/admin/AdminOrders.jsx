import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    const data = await api.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateOrderStatus(id, { status });
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#0B0712] p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="mt-2 text-sm text-gray-400">Track and update order status.</p>
        </div>

        <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
          <h2 className="text-xl font-semibold">All orders ({orders.length})</h2>
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl border border-[#2A233A] bg-[#110D1A] p-3">
                <div>
                  <p className="font-semibold">{order.first_name} {order.last_name}</p>
                  <p className="text-sm text-gray-400">{order.email}</p>
                  <p className="mt-1 text-sm">Order #{order.id} · KSh {Number(order.total).toLocaleString()}</p>
                </div>
                <select
                  className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2 text-sm capitalize"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status} className="capitalize">{status}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}