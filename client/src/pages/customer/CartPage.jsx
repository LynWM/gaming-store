import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ChevronRight } from "lucide-react";
import { useCart } from "../../context/cartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-4">
        <ShoppingCart size={48} className="text-[#6B6478]" />
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="text-sm text-[#9C97A8]">Add some products to get started.</p>
        <Link
          to="/"
          className="mt-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm font-bold transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#9C97A8]">Cart</span>
        </nav>

        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Cart</h1>
          <span className="text-sm text-[#9C97A8]">{totalItems} items</span>
        </section>

        <section className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] p-4"
            >
              <div className="w-16 h-16 rounded-xl bg-[#231C30] flex items-center justify-center shrink-0">
                <ShoppingCart size={24} className="text-[#6B6478]" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                <p className="text-xs text-[#9C97A8]">KSH {item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-[#1B1625] border border-[#231C30] text-white text-sm font-bold hover:bg-[#231C30] transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#1B1625] border border-[#231C30] text-white text-sm font-bold hover:bg-[#231C30] transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-sm font-bold text-white min-w-[60px] text-right">
                KSH {item.price * item.quantity}
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="w-8 h-8 rounded-lg bg-[#1B1625] border border-[#231C30] text-[#F87171] hover:bg-[#231C30] transition-colors flex items-center justify-center"
                aria-label="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6 flex flex-col gap-4">
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
          <button
            onClick={clearCart}
            className="w-full py-3 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold transition-colors"
          >
            Clear Cart
          </button>
          <button className="w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-bold transition-colors">
            Checkout
          </button>
        </section>
      </main>
    </div>
  );
}