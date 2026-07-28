import { Link } from "react-router-dom";
import { Gamepad2, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/cartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-[#110D1A] h-16 flex items-center px-6 border-b border-[#231C30] justify-between gap-4">
      {/* logo */}
      <Link to="/" className="text-xl font-black tracking-wider uppercase shrink-0 cursor-pointer">
        <span className="text-white">NEX</span>
        <span className="text-purple-500">PLAY</span>
      </Link>

      <div className="w-full max-w-md">
        <input
          type="text"
          className="w-full h-10 px-4 bg-[#1B1625] text-sm text-gray-200 placeholder-gray-500 rounded-full border border-[#2A233A] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="Search games, hardware, etc..."
        />
      </div>

      {/* Nav */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <Gamepad2 size={16} />
        </Link>

        <Link
          to="/wishlist"
          className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <Heart size={16} />
        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500 relative"
        >
          <ShoppingCart size={16} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <Link
          to="/signup"
          className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <User size={16} />
        </Link>
      </div>
    </nav>
  );
}