import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { api } from '../../services/api';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

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

  const toggleExpanded = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown date';
    return new Date(isoString).toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
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
            {orders.map((order) => {
              const isExpanded = expandedId === order.id;
              return (
                <div key={order.id} className="rounded-xl border border-[#2A233A] bg-[#110D1A]">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(order.id)}
                    className="flex w-full items-center justify-between p-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                      <div>
                        <p className="font-semibold">
                          {order.user ? `${order.user.first_name} ${order.user.last_name}` : 'Unknown customer'}
                        </p>
                        <p className="text-sm text-gray-400">{order.user?.email}</p>
                        <p className="mt-1 text-sm">
                          Order #{order.id} · KSh {Number(order.total).toLocaleString()} · {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <select
                      className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2 text-sm capitalize"
                      value={order.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status} className="capitalize">{status}</option>
                      ))}
                    </select>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[#2A233A] p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Items ({order.items.length})
                      </p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between rounded-lg bg-[#1B1625] p-2.5">
                            <div className="flex items-center gap-3">
                              {item.product_image && (
                                <img
                                  src={item.product_image}
                                  alt={item.product_name}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                              )}
                              <div>
                                <p className="text-sm font-medium">{item.product_name || 'Deleted product'}</p>
                                <p className="text-xs text-gray-400">
                                  Qty {item.quantity} · KSh {Number(item.price_at_purchase).toLocaleString()} each
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-semibold">
                              KSh {(item.quantity * item.price_at_purchase).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}