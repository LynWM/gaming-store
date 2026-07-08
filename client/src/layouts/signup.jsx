import React from 'react'

export default function Signup() {
  return (
    <div className='min-h-screen bg-[#0D0E12] text-white font-sans antialiased flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-[#161920] rounded-2xl border border-gray-800 p-8 shadow-2xl'>
        
        <div className='text-center mb-8'>
          <span className='text-2xl font-black tracking-wider text-white uppercase block mb-2'>
            ⚡NEXPLAY⚡
          </span>
          <h2 className='text-xl font-bold text-gray-200'>Create an Account</h2>
          <p className='text-sm text-gray-400 mt-1'>Join the next generation of gaming</p>
        </div>

        <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
          
          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>
              Username
            </label>
            <input 
              type='text' 
              required
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
              required
              className='w-full h-11 px-4 bg-[#1F2330] text-sm text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition'
              placeholder='you@example.com'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2'>
              Password
            </label>
            <input 
              type='password' 
              required
              className='w-full h-11 px-4 bg-[#1F2330] text-sm text-gray-200 placeholder-gray-600 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition'
              placeholder='••••••••'
            />
          </div>

          <button 
            type='submit'
            className='w-full h-11 mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-lg shadow-lg shadow-purple-900/30 transition-all duration-200 transform active:scale-[0.98]'
          >
            Sign Up
          </button>
        </form>

        <div className='text-center mt-6 text-sm text-gray-400'>
          Already have an account?{' '}
          <a href='#login' className='text-purple-400 hover:text-purple-300 font-semibold underline transition'>
            Log In
          </a>
        </div>

      </div>
    </div>
  )
}
