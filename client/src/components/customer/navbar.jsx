import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Gamepad2, Heart, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <nav className="bg-[#110D1A] h-16 flex items-center px-6 border-b border-[#231C30] justify-between gap-4">
      {/* logo */}
      <Link to="/" className="text-xl font-black tracking-wider uppercase shrink-0 cursor-pointer">
        <span className="text-white">NEX</span>
        <span className="text-purple-500">PLAY</span>
      </Link>

      {/* Search bar */}
      <form className="w-full max-w-md" onSubmit={handleSubmit} role="search">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full h-10 px-4 bg-[#1B1625] text-sm text-gray-200 placeholder-gray-500 rounded-full border border-[#2A233A] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="Search games, hardware, accounts..."
          aria-label="Search games, hardware, accounts"
        />
      </form>

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
          className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <ShoppingCart size={16} />
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