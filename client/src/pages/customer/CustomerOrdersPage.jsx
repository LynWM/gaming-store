import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { api } from "../../services/api";

const STATUS_STYLES = {
  pending: "bg-[#F59E0B]/15 text-[#FBBF24]",
  processing: "bg-[#3B82F6]/15 text-[#60A5FA]",
  shipped: "bg-[#8B5CF6]/15 text-[#C4B5FD]",
  delivered: "bg-[#10B981]/15 text-[#34D399]",
  cancelled: "bg-[#EF4444]/15 text-[#F87171]",
};

export default function CustomerOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    api.getOrders(user.id)
      .then(setOrders)
      .catch((err) => setError(err.message || "Failed to load orders"))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex items-center justify-center">
        <p className="text-sm text-[#9C97A8]">Loading your orders…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex items-center justify-center">
        <p className="text-sm text-[#F87171]">Couldn't load orders: {error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-3 p-8">
        <Package size={40} className="text-[#9C97A8]" />
        <p className="text-lg font-semibold">No orders yet</p>
        <p className="text-sm text-[#9C97A8] text-center max-w-sm">
          Your order history will show up here once you complete a purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>

        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-5">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-white">Order #{order.id}</p>
                  <p className="text-xs text-[#6B6478]">KSh {Number(order.total).toLocaleString()}</p>
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] || "bg-white/10 text-white"}`}>
                  {order.status}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    {item.product_image && (
                      <img src={item.product_image} alt={item.product_name} className="w-10 h-10 rounded-lg object-cover" />
                    )}
                    <span className="text-gray-200">{item.product_name || `Product #${item.product_id}`}</span>
                    <span className="text-[#6B6478]">x{item.quantity}</span>
                    <span className="ml-auto text-gray-300">KSh {Number(item.price_at_purchase).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}