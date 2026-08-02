import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ADMIN_NAV_LINKS } from "../../components/admin/adminNav";

export default function AdminTopBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const heading = ADMIN_NAV_LINKS.find((link) => link.to === location.pathname)?.label || "Admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-[#231C30] bg-[#110D1A] px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A855F7]">NEXPLAY</p>
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