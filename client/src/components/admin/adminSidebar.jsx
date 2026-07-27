import { LayoutDashboard, Package, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const colors = {
  sidebar: "#110D1A",
  border: "#231C30",
  text: "#a1a1b5",
  violet: "#7c3aed",
  activeBg: "#1B1625",
};
 
const links = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Manage Products", to: "/admin/products", icon: Package },
  { label: "Manage Users", to: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
  return (
     <aside
      className="w-56 min-h-[calc(100vh-4rem)] px-3 py-6 border-r"
      style={{ backgroundColor: colors.sidebar, borderColor: colors.border }}
    >
      <nav className="flex flex-col gap-1">
        {links.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "text-white" : ""
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.activeBg : "transparent",
              color: isActive ? "#fff" : colors.text,
              borderLeft: isActive ? `3px solid ${colors.violet}` : "3px solid transparent",
            })}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
