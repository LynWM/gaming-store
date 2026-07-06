import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

// ---- Color tokens ----
const colors = {
  navbar: "#0d0d17",
  border: "rgba(124,58,237,0.15)",
  navText: "#a1a1b5",
  violet: "#7c3aed"
};

export default function Navbar({ cartCount = 0, onOpenSignIn }) {
  const linkStyle = { color: colors.navText };

  const hoverProps = {
    onMouseOver: (e) => (e.currentTarget.style.color = colors.violet),
    onMouseOut: (e) => (e.currentTarget.style.color = colors.navText),
  };

  return (
    <nav
      style={{
        background: colors.navbar,
        borderBottom: `1px solid ${colors.border}`,
      }}
      className="w-full sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: colors.violet }}
          >
            NEXPLAY
          </span>
        </Link>

        {/* Right-side nav */}
        <div className="flex items-center gap-7 text-sm font-medium">
          <Link to="/" style={linkStyle} className="transition-colors" {...hoverProps}>
            Home
          </Link>

          <Link to="/products" style={linkStyle} className="transition-colors" {...hoverProps}>
            Products
          </Link>

          {/* Cart */}
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingCart size={20} style={{ color: colors.navText }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: colors.violet, color: "#fff" }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Sign In */}
          <button
            onClick={onOpenSignIn}
            className="px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: colors.violet }}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}