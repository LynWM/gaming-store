import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Gamepad2, Heart, ShoppingCart, User, Search, X, Package, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/authContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const debounceRef = useRef(null);
  const isFirstRender = useRef(true);
  const menuRef = useRef(null);

  // Keep the search box in sync with the URL (e.g. back/forward navigation)
  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      setQuery(params.get("q") || "");
    }
  }, [location.pathname, location.search]);

  // Debounced live search as the user types
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const value = query.trim();
      if (value) {
        navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
      } else if (location.pathname === "/search") {
        navigate("/", { replace: true });
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Close the profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const value = query.trim();
    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (location.pathname === "/search") {
      navigate("/");
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#110D1A] h-16 flex items-center px-6 border-b border-[#231C30] justify-between gap-4">
      {/* logo */}
      <Link to="/" className="text-xl font-black tracking-wider uppercase shrink-0 cursor-pointer">
        <span className="text-white">NEX</span>
        <span className="text-purple-500">PLAY</span>
      </Link>

      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-10 bg-[#1B1625] text-sm text-gray-200 placeholder-gray-500 rounded-full border border-[#2A233A] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Search games, hardware, accounts..."
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>
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
          className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500 relative"
        >
          <ShoppingCart size={16} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30]"
            >
              <User size={16} /> {user.first_name}
              <ChevronDown size={14} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#2A233A] bg-[#1B1625] shadow-xl overflow-hidden z-20">
                <div className="px-4 py-3 border-b border-[#2A233A]">
                  <p className="text-sm font-semibold text-white truncate">{user.first_name} {user.last_name}</p>
                  <p className="text-xs text-gray-400 truncate">@{user.username}</p>
                </div>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#231C30]"
                >
                  <Package size={14} /> Order History
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-[#231C30]"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signup"
            className="flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <User size={16} />
          </Link>
        )}
      </div>
    </nav>
  );
}