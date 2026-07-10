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
  ArrowRight,
  Star
} from 'lucide-react'

const CATEGORIES = [
  { name: 'Consoles', slug: 'consoles', icon: Gamepad2, color: 'text-[#A855F7]', bg: 'bg-[#A855F7]/15', border: 'hover:border-[#A855F7]' },
  { name: 'Games', slug: 'games', icon: Gamepad2, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/15', border: 'hover:border-[#3B82F6]' },
  { name: 'Monitors', slug: 'monitors', icon: Monitor, color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/15', border: 'hover:border-[#06B6D4]' },
  { name: 'Laptops', slug: 'laptops', icon: Laptop, color: 'text-[#10B981]', bg: 'bg-[#10B981]/15', border: 'hover:border-[#10B981]' },
  { name: 'Board Games', slug: 'board-games', icon: Grid, color: 'text-[#F97316]', bg: 'bg-[#F97316]/15', border: 'hover:border-[#F97316]' },
  { name: 'Accessories', slug: 'accessories', icon: Boxes, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/15', border: 'hover:border-[#EF4444]' },
  { name: 'Services', slug: 'services', icon: Wrench, color: 'text-[#EAB308]', bg: 'bg-[#EAB308]/15', border: 'hover:border-[#EAB308]' },
  { name: 'Tournaments', slug: 'tournaments', icon: Trophy, color: 'text-[#EC4899]', bg: 'bg-[#EC4899]/15', border: 'hover:border-[#EC4899]' }
]

const FLASH_DEALS = [
  { id: 1, name: 'Xbox Series X', description: '1TB, 4K 120fps Gaming', price: 51699, oldPrice: 64624, discount: '-20%', badge: 'DEAL', rating: 5, reviews: 61030, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800', link: '/products/xbox-series-x' },
  { id: 2, name: 'PS5 Slim Digital', description: 'Compact Edition, No Disc', price: 45236, oldPrice: 51699, discount: '-13%', badge: 'SALE', rating: 5, reviews: 22100, image: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800', link: '/products/ps5-slim-digital' },
  { id: 3, name: 'Cyberpunk 2077', description: 'PC Digital Download', price: 3876, oldPrice: 6461, discount: '-40%', badge: 'SALE', rating: 5, reviews: 28900, image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800', link: '/products/cyberpunk-2077' },
  { id: 4, name: 'God of War Ragnarök', description: 'PS5 Exclusive', price: 6461, oldPrice: 9046, discount: '-29%', badge: 'DEAL', rating: 5, reviews: 67800, image: 'https://images.unsplash.com/photo-1752833005527-38a858157afd?w=800', link: '/products/god-of-war-ragnarok' },
  { id: 5, name: 'Nintendo Switch OLED', description: 'Portable Gaming Console', price: 38774, oldPrice: 45236, discount: '-14%', badge: 'SALE', rating: 5, reviews: 43120, image: 'https://images.unsplash.com/photo-1750049452920-1332f3208f75?w=800', link: '/products/nintendo-switch-oled' },
  { id: 6, name: 'ASUS ROG Monitor', description: "27'' 165Hz IPS", price: 36189, oldPrice: 42651, discount: '-15%', badge: 'HOT', rating: 5, reviews: 19004, image: 'https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=800', link: '/products/asus-monitor' },
  { id: 7, name: 'SteelSeries Headset', description: '7.1 Surround Sound', price: 10339, oldPrice: 12924, discount: '-20%', badge: 'SALE', rating: 5, reviews: 8400, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800', link: '/products/steelseries-headset' },
  { id: 8, name: 'Logitech G Pro X', description: 'Mechanical Gaming Keyboard', price: 15509, oldPrice: 19386, discount: '-20%', badge: 'HOT', rating: 5, reviews: 15780, image: 'https://images.unsplash.com/photo-1756694938594-e760b4bd3bfb?w=800', link: '/products/logitech-keyboard' },
  { id: 9, name: 'Razer DeathAdder V3', description: 'Wireless Gaming Mouse', price: 9046, oldPrice: 11631, discount: '-22%', badge: 'SALE', rating: 5, reviews: 11300, image: 'https://images.unsplash.com/photo-1616296425622-4560a2ad83de?w=800', link: '/products/razer-mouse' },
  { id: 10, name: 'RTX 4080', description: '16GB Graphics Card', price: 129249, oldPrice: 155099, discount: '-17%', badge: 'HOT', rating: 5, reviews: 9600, image: 'https://images.unsplash.com/photo-1555618565-9f2b0323a10d?w=800', link: '/products/rtx-4080' },
  { id: 11, name: 'MSI Gaming Laptop', description: 'RTX 4070 • Intel i9', price: 219724, oldPrice: 245574, discount: '-11%', badge: 'DEAL', rating: 5, reviews: 5400, image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=800', link: '/products/msi-laptop' },
  { id: 12, name: 'DualSense Controller', description: 'Wireless PS5 Controller', price: 7754, oldPrice: 10339, discount: '-25%', badge: 'SALE', rating: 5, reviews: 31400, image: 'https://images.unsplash.com/photo-1754594207981-8b97210a6d3a?w=800', link: '/products/dualsense-controller' }
]

const BADGE_STYLES = {
  DEAL: 'bg-[#7C3AED] text-white',
  SALE: 'bg-[#F43F5E] text-white',
  HOT: 'bg-[#F59E0B] text-[#1C1200]'
}

export default function Homepage() {
  return (
    <div className='min-h-screen bg-[#0B0712] text-white font-sans antialiased select-none'>

      <main className='max-w-350 mx-auto px-8 py-8 flex flex-col gap-10'>

        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'>

          <div className='lg:col-span-2 relative overflow-hidden bg-linear-to-r from-[#201538] to-[#120D24] rounded-2xl border border-[#2D224E] min-h-85 p-10 flex flex-col justify-between'>
            <div className='absolute right-10 bottom-0 top-0 w-1/2 bg-[url("https://unsplash.com")] bg-contain bg-no-repeat bg-right opacity-30 mix-blend-screen pointer-events-none' />

            <div>
              <span className='text-[10px] uppercase font-bold tracking-widest text-purple-400'>Featured</span>
              <h1 className='text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 mb-3 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                Next-Gen Gaming
              </h1>
              <p className='text-sm text-gray-400 max-w-sm font-medium'>
                PS5 & Xbox Series X — up to 25% off!
              </p>
            </div>

            <a href="/shop-consoles" className='w-fit flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] font-bold text-sm text-white rounded-lg shadow-lg'>
              Shop Consoles <ArrowRight size={14} />
            </a>
          </div>

          <div className='flex flex-col gap-4 h-full'>

            <a href="/tournaments" className='flex-1 relative overflow-hidden bg-linear-to-br from-[#4C0519] to-[#1C000A] rounded-2xl border border-[#9F1239]/40 p-6 flex flex-col justify-end hover:border-[#F43F5E]/60'>
              <div className='absolute top-0 right-0 left-0 bottom-0 bg-[url("https://unsplash.com")] bg-cover bg-center opacity-15 mix-blend-luminosity' />
              <div className='relative z-10'>
                <span className='text-[11px] font-bold tracking-wide text-[#FB7185] uppercase'>$50K Prize Pool</span>
                <h3 className='text-xl font-extrabold mt-0.5 tracking-tight text-white'>Tournaments</h3>
              </div>
            </a>

            <a href="/monitors" className='flex-1 relative overflow-hidden bg-linear-to-br from-[#064E3B] to-[#022C22] rounded-2xl border border-[#065F46]/40 p-6 flex flex-col justify-end hover:border-[#10B981]/60'>
              <div className='absolute top-0 right-0 left-0 bottom-0 bg-[url("https://unsplash.com")] bg-cover bg-center opacity-20 mix-blend-overlay' />
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
                  className={`group flex flex-col items-center justify-center py-6 px-3 rounded-xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] ${category.border}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-transparent shadow-[inset_0_0_12px_rgba(255,255,255,0.05)] ${category.bg}`}>
                    <IconComponent size={20} className={`${category.color}`} />
                  </div>

                  <span className='text-[13px] font-medium text-[#9C97A8] group-hover:text-white text-center select-none whitespace-nowrap'>
                    {category.name}
                  </span>
                </a>
              )
            })}
          </div>
        </section>

        <section className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold tracking-tight text-white'>Flash Deals</h2>
            <a href="/flash-deals" className='text-[#7C3AED] hover:text-[#6D28D9] font-medium'>See All</a>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
            {FLASH_DEALS.map((product) => (
              <a
                key={product.id}
                href={product.link}
                className='relative flex flex-col overflow-hidden rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] hover:border-[#7C3AED]'
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='h-52 w-full object-cover'
                  />
                  <div className='absolute inset-x-0 top-0 flex items-center justify-between p-3'>
                    <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md ${BADGE_STYLES[product.badge]}`}>
                      {product.badge}
                    </span>
                    <span className='text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-black/60 text-[#FB7185] border border-[#F43F5E]/30 backdrop-blur-sm'>
                      {product.discount}
                    </span>
                  </div>
                  <button
                    type="button"
                    className='absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#FB7185] hover:border-[#F43F5E]/40 backdrop-blur-sm'
                  >
                    <Heart size={15} />
                  </button>
                </div>

                <div className='flex flex-1 flex-col p-4'>
                  <h3 className='text-[15px] font-bold tracking-tight text-white leading-snug'>
                    {product.name}
                  </h3>
                  <p className='text-[13px] text-gray-400 font-medium mt-0.5'>
                    {product.description}
                  </p>

                  <div className='flex items-center gap-1 mt-2.5'>
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} size={12} className='fill-[#EAB308] text-[#EAB308]' />
                    ))}
                    <span className='text-[11px] text-[#655F75] ml-1.5 font-medium'>
                      ({product.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className='flex items-center gap-2.5 mt-4'>
                    <span className='text-xl font-extrabold text-white tracking-tight'>
                      KSh {product.price.toLocaleString()}
                    </span>
                    <span className='text-sm text-[#655F75] line-through font-medium'>
                      KSh {product.oldPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-sm font-bold text-white'
                  >
                    <ShoppingCart size={15} /> Add To Cart
                  </button>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
