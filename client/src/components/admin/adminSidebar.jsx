import { NavLink } from 'react-router-dom';
import { ADMIN_NAV_LINKS } from '../../components/admin/adminNav';

export default function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-[#231C30] bg-[#110D1A] p-6 lg:block">
      <nav className="space-y-2">
        {ADMIN_NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-[#7C3AED] text-white' : 'text-gray-300 hover:bg-[#1B1625]'}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}