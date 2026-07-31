import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/users": "Users",
  "/admin/orders": "Orders",
};

export default function AdminTopBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const heading = pageTitles[location.pathname] || "Admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-[#231C30] bg-[#110D1A] px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A855F7]">Operations</p>
          <h1 className="text-lg font-semibold text-white">{heading}</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-gray-400">{user.username}</span>}
          <button
            onClick={handleLogout}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Logout
          </button>
          <Link to="/" className="rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white">
            Back to shop
          </Link>
        </div>
      </div>
    </header>
  );
}