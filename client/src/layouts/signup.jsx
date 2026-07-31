import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const result = await signup(formData)

    if (result.success) {
      setSuccess('Account created successfully')
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className='min-h-screen bg-[#0D0E12] text-white font-sans antialiased flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-[#161920] rounded-2xl border border-gray-800 p-8 shadow-2xl'>
        
        <div className='text-center mb-8'>
          <span className='text-2xl font-black tracking-wider text-white uppercase block mb-2'>
            NEXPLAY
          </span>
          <h2 className='text-xl font-bold text-gray-200'>Create an Account</h2>
          <p className='text-sm text-gray-400 mt-1'>Join the next generation of gaming</p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>
              First Name
            </label>
            <input 
              type='text' 
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className='w-full h-11 px-4 bg-[#1F2330] text-sm text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition'
              placeholder='First Name'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>
              Last Name
            </label>
            <input 
              type='text' 
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className='w-full h-11 px-4 bg-[#1F2330] text-sm text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition'
              placeholder='Last Name'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>
              Username
            </label>
            <input 
              type='text' 
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className='w-full h-11 px-4 bg-[#1F2330] text-sm text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition'
              placeholder='GamingID'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>
              Email Address
            </label>
            <input 
              type='email' 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className='w-full h-11 px-4 bg-[#1F2330] text-sm text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition'
              placeholder='you@example.com'
            />
          </div>

           <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c92b2]">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#535975]">
                <Lock className="w-5 h-5" />
              </span>
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                required 
                placeholder="••••••••"
                className="w-full bg-[#1c1f30] text-white placeholder-[#535975] text-sm rounded-xl pl-11 pr-11 py-3 border border-[#2a2f4a] focus:outline-none focus:border-[#9d4edd] focus:ring-1 focus:ring-[#9d4edd] transition-all duration-200" 
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#535975] hover:text-[#8c92b2] transition-colors" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c92b2]">
                Confirm Password
              </label>
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className='text-sm text-red-400 text-center'>{error}</p>
          )}
          {success && (
            <p className='text-sm text-emerald-400 text-center'>{success}</p>
          )}

          <button 
            type='submit'
            className='w-full h-11 mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-purple-900/30 transition-all duration-200 transform active:scale-[0.98]'
          >
            Sign Up
          </button>
        </form>

        <div className='text-center mt-6 text-sm text-gray-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-purple-400 hover:text-purple-300 font-semibold underline transition'>
            Log In
          </Link>
        </div>

      </div>
    </div>
  )
}