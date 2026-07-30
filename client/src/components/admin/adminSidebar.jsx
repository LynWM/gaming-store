import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/orders', label: 'Orders' },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-[#231C30] bg-[#110D1A] p-6 lg:block">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A855F7]">NEXPLAY</p>
        <h2 className="mt-2 text-xl font-bold text-white">Admin</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
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
