import React from 'react'
import { 
  Gamepad2, 
  Heart, 
  ShoppingCart, 
  User, 
  Monitor, 
  Laptop, 
  Grid, 
  Boxes, 
  Wrench, 
  Trophy,
  ArrowRight
} from 'lucide-react'

const CATEGORIES = [
  { name: 'Consoles', slug: 'consoles', icon: Gamepad2, color: 'text-[#A855F7]', bg: 'bg-[#A855F7]/15', border: 'hover:border-[#A855F7] hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]' },
  { name: 'Games', slug: 'games', icon: Gamepad2, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/15', border: 'hover:border-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
  { name: 'Monitors', slug: 'monitors', icon: Monitor, color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/15', border: 'hover:border-[#06B6D4] hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' },
  { name: 'Laptops', slug: 'laptops', icon: Laptop, color: 'text-[#10B981]', bg: 'bg-[#10B981]/15', border: 'hover:border-[#10B981] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
  { name: 'Board Games', slug: 'board-games', icon: Grid, color: 'text-[#F97316]', bg: 'bg-[#F97316]/15', border: 'hover:border-[#F97316] hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]' },
  { name: 'Accessories', slug: 'accessories', icon: Boxes, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/15', border: 'hover:border-[#EF4444] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]' },
  { name: 'Services', slug: 'services', icon: Wrench, color: 'text-[#EAB308]', bg: 'bg-[#EAB308]/15', border: 'hover:border-[#EAB308] hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]' },
  { name: 'Tournaments', slug: 'tournaments', icon: Trophy, color: 'text-[#EC4899]', bg: 'bg-[#EC4899]/15', border: 'hover:border-[#EC4899] hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]' }
]

export default function Homepage() {
  return (
    <div className='min-h-screen bg-[#0B0712] text-white font-sans antialiased select-none'>
      <nav className='bg-[#110D1A] h-16 flex items-center px-6 border-b border-[#231C30] justify-between gap-4'>
        <a href="/" className='text-xl font-black tracking-wider text-white uppercase shrink-0 cursor-pointer'>
          ⚡NEXPLAY⚡
        </a>

        <div className='w-full max-w-md'>
          <input 
            type='text'
            className='w-full h-10 px-4 bg-[#1B1625] text-sm text-gray-200 placeholder-gray-500 rounded-full border border-[#2A233A] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500' 
            placeholder='Search games, hardware, accounts...' 
          /> 
        </div>
        
        <div className='flex items-center gap-4'>
          <button className='flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500'>
            <Gamepad2 size={16} /> 
          </button>
          <button className='flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500'>
            <Heart size={16} />
          </button>
          <button className='flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500'>
            <ShoppingCart size={16} />
          </button> 
          <button className='flex items-center gap-2 px-4 py-2 bg-[#1B1625] text-sm text-gray-200 rounded-full border border-[#2A233A] hover:bg-[#231C30] focus:outline-none focus:ring-1 focus:ring-purple-500'>
            <User size={16} />
          </button>
        </div>
      </nav>

      <main className='max-w-[1400px] mx-auto px-8 py-8 flex flex-col gap-10'>
        
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'>
          
          <div className='lg:col-span-2 relative overflow-hidden bg-gradient-to-r from-[#201538] to-[#120D24] rounded-2xl border border-[#2D224E] min-h-[340px] p-10 flex flex-col justify-between group'>
            <div className='absolute right-10 bottom-0 top-0 w-1/2 bg-[url("https://unsplash.com")] bg-contain bg-no-repeat bg-right opacity-30 mix-blend-screen pointer-events-none' />

            <div>
              <span className='text-[10px] uppercase font-bold tracking-widest text-purple-400'>Featured</span>
              <h1 className='text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                Next-Gen Gaming
              </h1>
              <p className='text-sm text-gray-400 max-w-sm font-medium'>
                PS5 & Xbox Series X — up to 25% off!
              </p>
            </div>

            <a href="/shop-consoles" className='w-fit flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] font-bold text-sm text-white rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5'>
              Shop Consoles <ArrowRight size={14} />
            </a>
          </div>

          <div className='flex flex-col gap-4 h-full'>
            
            <a href="/tournaments" className='flex-1 relative overflow-hidden bg-gradient-to-br from-[#4C0519] to-[#1C000A] rounded-2xl border border-[#9F1239]/40 p-6 flex flex-col justify-end group transition-all hover:border-[#F43F5E]/60'>
              <div className='absolute top-0 right-0 left-0 bottom-0 bg-[url("https://unsplash.com")] bg-cover bg-center opacity-15 mix-blend-luminosity group-hover:scale-105 transition-transform duration-500' />
              <div className='relative z-10'>
                <span className='text-[11px] font-bold tracking-wide text-[#FB7185] uppercase'>$50K Prize Pool</span>
                <h3 className='text-xl font-extrabold mt-0.5 tracking-tight text-white'>Tournaments</h3>
              </div>
            </a>

            <a href="/monitors" className='flex-1 relative overflow-hidden bg-gradient-to-br from-[#064E3B] to-[#022C22] rounded-2xl border border-[#065F46]/40 p-6 flex flex-col justify-end group transition-all hover:border-[#10B981]/60'>
              <div className='absolute top-0 right-0 left-0 bottom-0 bg-[url("https://unsplash.com")] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-500' />
              <div className='relative z-10'>
                <span className='text-[11px] font-bold tracking-wide text-[#34D399] uppercase'>4K & Ultra-Wide Deals</span>
                <h3 className='text-xl font-extrabold mt-0.5 tracking-tight text-white'>New Monitors</h3>
              </div>
            </a>

          </div>
        </section>

        <section className='w-full'>
          <h2 className='text-xl font-bold tracking-tight mb-6 text-white'>Shop by Category</h2>
          
          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full'>
            {CATEGORIES.map((category, index) => {
              const IconComponent = category.icon
              return (
                <a 
                  key={index}
                  href={`/${category.slug}`}
                  className={`group flex flex-col items-center justify-center py-6 px-3 rounded-xl border border-[#231C30] bg-gradient-to-b from-[#1B1625] to-[#110D1A] transition-all duration-200 hover:-translate-y-1 ${category.border}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-transparent shadow-[inset_0_0_12px_rgba(255,255,255,0.05)] transition-colors duration-200 ${category.bg}`}>
                    <IconComponent size={20} className={`${category.color}`} />
                  </div>
                  
                  <span className='text-[13px] font-medium text-[#9C97A8] group-hover:text-white transition-colors duration-200 text-center select-none whitespace-nowrap'>
                    {category.name}
                  </span>
                </a>
              )
            })}
          </div>
        </section>

      </main>
    </div>
  )
}
