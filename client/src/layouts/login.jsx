import React, { useState } from 'react';
import { Gamepad2, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(formData.email, formData.password);

    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f5f5f7] flex items-center justify-center font-sans px-4 antialiased selection:bg-[#9d4edd] selection:text-white">
      <div className="absolute w-100 h-100 bg-[#9d4edd]/10 rounded-full blur-[120px] top-1/4 left-1/3 pointer-events-none" />
      <div className="absolute w-75 h-75 bg-[#3a0ca3]/20 rounded-full blur-[100px] bottom-1/4 right-1/3 pointer-events-none" />

      <div className="w-full max-w-md bg-[#131520] border border-[#23263a] rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Gamepad2 className="w-8 h-8 text-[#9d4edd] animate-pulse" />
          <span className="text-2xl font-black uppercase tracking-wider text-white">
            NEX<span className="text-[#9d4edd]">PLAY</span>
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome Back, Player One</h2>
          <p className="text-sm text-[#8c92b2]">Enter your credentials to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c92b2] mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#535975]">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                className="w-full bg-[#1c1f30] text-white placeholder-[#535975] text-sm rounded-xl pl-11 pr-4 py-3 border border-[#2a2f4a] focus:outline-none focus:border-[#9d4edd] focus:ring-1 focus:ring-[#9d4edd] transition-all duration-200"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c92b2]">
                Password
              </label>
              <a href="#forgot" className="text-xs font-medium text-[#9d4edd] hover:underline hover:text-[#b57cff] transition-all">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#535975]">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full bg-[#1c1f30] text-white placeholder-[#535975] text-sm rounded-xl pl-11 pr-11 py-3 border border-[#2a2f4a] focus:outline-none focus:border-[#9d4edd] focus:ring-1 focus:ring-[#9d4edd] transition-all duration-200"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#535975] hover:text-[#8c92b2] transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 bg-[#1c1f30] border-[#2a2f4a] rounded text-[#9d4edd] focus:ring-0 accent-[#9d4edd] cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#8c92b2] cursor-pointer select-none">
              Keep me logged in
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#9d4edd] hover:bg-[#b57cff] text-white font-semibold text-sm rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-lg shadow-[#9d4edd]/20 transform active:scale-[0.99] transition-all duration-150 group mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#23263a] pt-6">
          <p className="text-sm text-[#8c92b2]">
            New to NextPlay?{' '}
            <Link to="/signup" className="font-semibold text-[#9d4edd] hover:underline hover:text-[#b57cff] transition-all">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}