import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/authContext";
import { api } from "../../services/api";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-4">
        <ShoppingCart size={48} className="text-[#6B6478]" />
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-[#9C97A8]">Add some products before checking out.</p>
        <Link
          to="/"
          className="mt-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm font-bold transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    try {
      await api.createOrder({
        user_id: user.id,
        total: totalPrice,
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.message || "Failed to place order");
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <span className="text-[#9C97A8]">Checkout</span>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>

        <section className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#9C97A8]">Order items</h2>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] p-4"
              >
                <div className="w-14 h-14 rounded-xl bg-[#231C30] flex items-center justify-center shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingCart size={20} className="text-[#6B6478]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                  <p className="text-xs text-[#9C97A8]">Qty {item.quantity} · KSH {item.price}</p>
                </div>
                <div className="text-sm font-bold text-white">
                  KSH {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6 flex flex-col gap-4 h-fit">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#9C97A8]">Order summary</h2>

            <div className="flex justify-between text-sm">
              <span className="text-[#9C97A8]">Subtotal</span>
              <span className="text-white font-bold">KSH {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9C97A8]">Shipping</span>
              <span className="text-white font-bold">Free</span>
            </div>
            <div className="border-t border-[#231C30] pt-3 flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-white font-extrabold text-lg">KSH {totalPrice.toLocaleString()}</span>
            </div>

            {error && <p className="text-sm text-[#F87171]">{error}</p>}

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
            >
              {placing ? "Placing order…" : "Place Order"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}