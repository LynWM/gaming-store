import React from 'react'
import { useAuth } from '../../context/authContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield, Store } from 'lucide-react';

const colors = {
  bar: "#110d1a",
  border: "#231c30",
  text: "#a1a1b5",
}

// Route path

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/products": "Manage Products",
  "/admin/users": "Manage Users",
}

export default function AdminTopBar() {

  const {user, logout} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const heading = pageTitles[location.pathname] || "Admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header 
      className='h-16 flex items-center justify-between px-6 border-b'
      style={{ backgroundColor: colors.bar,  borderColor: colors.border}}>

      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-lg font-black tracking-wider uppercase">
          <span className="text-white">NEX</span>
          <span className='text-purple-500'>PLAY</span>
        </Link>
        <span className="text-sm hidden md:inline" style={{ color: colors.text }}>
          / {heading}
        </span>
      </div>

      <div className='flex items-center gap-10'>

        {/* Back to store */}
        <Link
          to="/"
          className="flex items-center gap-1 text-sm transition-colors hover:text-white"
          style={{ color: colors.text }}
        >
          <Store size={16} />
          Back to Store
        </Link>

        <div className='flex items-center gap-2'>

          <span
            className=""
          >
            <Shield size={20} className="text-purple-500" />
          </span>

          <span className="text-sm font-medium text-white">
            {user?.name || "Admin"}
          </span>
        </div>

        {/* Logout */}
        <Link
          to="/login"
          className="flex items-center gap-1 text-sm transition-colors text-gray-400 hover:text-white"
        >
          <LogOut size={16}/>
        </Link>

      </div>
    </header>
  )
}
