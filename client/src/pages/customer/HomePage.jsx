import {
  Gamepad2,
  Heart,
  ShoppingCart,
  Monitor,
  Laptop,
  Grid,
  Boxes,
  Wrench,
  Trophy,
  ArrowRight,
  Star,
  Check,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/cartContext'
import { useWishlist } from '../../context/wishlistContext'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'

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

const BADGE_STYLES = {
  DEAL: 'bg-[#7C3AED] text-white',
  SALE: 'bg-[#F43F5E] text-white',
  HOT: 'bg-[#F59E0B] text-[#1C1200]'
}

const FLASH_DEALS_PREVIEW_LIMIT = 4;

export default function Homepage() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [flashDeals, setFlashDeals] = useState([]);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    api.getDeals()
      .then(setFlashDeals)
      .catch((err) => console.error('Failed to load deals:', err));
  }, []);

  const previewDeals = flashDeals.slice(0, FLASH_DEALS_PREVIEW_LIMIT);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId((current) => (current === product.id ? null : current)), 1500);
  };

  return (
    <div className='min-h-screen bg-[#0B0712] text-white font-sans antialiased select-none'>

      <main className='max-w-350 mx-auto px-8 py-8 flex flex-col gap-10'>

        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'>

          <div className='lg:col-span-2 relative overflow-hidden bg-linear-to-r from-[#201538] to-[#120D24] rounded-2xl border border-[#2D224E] min-h-85 p-10 flex flex-col justify-between'>
            <div className='absolute right-10 bottom-0 top-0 w-1/2 bg-[url("data:image/jpeg;base64,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)] bg-contain bg-no-repeat bg-right opacity-30 mix-blend-screen pointer-events-none' />

            <div>
              <span className='text-[10px] uppercase font-bold tracking-widest text-purple-400'>Featured</span>
              <h1 className='text-4xl font-extrabold tracking-tight mt-1 mb-3 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                Next-Gen Gaming
              </h1>
              <p className='text-sm text-gray-400 max-w-sm font-medium'>
                PS5 & Xbox Series X — up to 25% off!
              </p>
            </div>

            <Link to="/consoles" className="w-fit flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] font-bold text-sm text-white rounded-lg shadow-lg">
              Shop Consoles <ArrowRight size={14} />
             </Link>
          </div>

          <div className='flex flex-col gap-4 h-full'>

            <Link to="/tournaments" className='flex-1 relative overflow-hidden bg-linear-to-br from-[#4C0519] to-[#1C000A] rounded-2xl border border-[#9F1239]/40 p-6 flex flex-col justify-end hover:border-[#F43F5E]/60'>
              <div className='absolute top-0 right-0 left-0 bottom-0 bg-[url("https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&auto=format&fit=crop")] bg-cover bg-center opacity-40 mix-blend-luminosity' />
              <div className='relative z-10'>
                <span className='text-[11px] font-bold tracking-wide text-[#FB7185] uppercase'> ksh 50K Prize Pool</span>
                <h3 className='text-xl font-extrabold mt-0.5 tracking-tight text-white'>Tournaments</h3>
              </div>
            </Link>

            <Link to="/monitors" className='flex-1 relative overflow-hidden bg-linear-to-br from-[#064E3B] to-[#022C22] rounded-2xl border border-[#065F46]/40 p-6 flex flex-col justify-end hover:border-[#10B981]/60'>
              <div className='absolute top-0 right-0 left-0 bottom-0 bg-[url("https://images.unsplash.com/photo-1726442116417-de02f3116eed?w=800&auto=format&fit=crop")] bg-cover bg-center opacity-40 mix-blend-overlay' />
              <div className='relative z-10'>
                <span className='text-[11px] font-bold tracking-wide text-[#34D399] uppercase'>4K & Ultra-Wide Deals</span>
                <h3 className='text-xl font-extrabold mt-0.5 tracking-tight text-white'>New Monitors</h3>
              </div>
            </Link>

          </div>
        </section>

        <section className='w-full'>
          <h2 className='text-xl font-bold tracking-tight mb-6 text-white'>Shop by Category</h2>

          <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full'>
            {CATEGORIES.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={index}
                  to={`/${category.slug}`}
                  className={`group flex flex-col items-center justify-center py-6 px-3 rounded-xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] ${category.border}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-transparent shadow-[inset_0_0_12px_rgba(255,255,255,0.05)] ${category.bg}`}>
                    <IconComponent size={20} className={`${category.color}`} />
                  </div>

                  <span className='text-[13px] font-medium text-[#9C97A8] group-hover:text-white text-center select-none whitespace-nowrap'>
                    {category.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold tracking-tight text-white'>Flash Deals</h2>
            <Link to="/flash-deals" className='text-[#7C3AED] hover:text-[#6D28D9] font-medium'>See All</Link>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
            {previewDeals.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <Link
                  key={product.id}
                  to={product.link}
                  className='relative flex flex-col overflow-hidden rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] hover:border-[#7C3AED]'
                >
                  <div className='relative overflow-hidden'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-52 w-full object-cover'
                    />
                    <div className='absolute inset-x-0 top-0 flex items-center justify-between p-3'>
                      {product.badge && (
                        <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md ${BADGE_STYLES[product.badge] || BADGE_STYLES.DEAL}`}>
                          {product.badge}
                        </span>
                      )}
                      <span className='text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-black/60 text-[#FB7185] border border-[#F43F5E]/30 backdrop-blur-sm'>
                        {product.discount}
                      </span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist({
                          ...product,
                          accent: { hex: "#7c3aed", from: "#2d1b4e", via: "#1b1030", rgb: "124,58,237"}
                        });
                      }}
                      className='absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#FB7185] hover:border-[#F43F5E]/40 backdrop-blur-sm'
                    >
                      <Heart 
                        size={15} 
                        className={isInWishlist(product.id) ? "fill-[#F43F5E] text-[#F43F5E]" : ""}
                      />
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
                      {[...Array(product.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} className='fill-[#EAB308] text-[#EAB308]' />
                      ))}
                      <span className='text-[11px] text-[#655F75] ml-1.5 font-medium'>
                        ({(product.reviews || 0).toLocaleString()})
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
                      onClick={(e) => handleAddToCart(e, product)}
                      className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white transition-colors duration-200 ${
                        isAdded ? 'bg-[#10B981]' : 'bg-[#7C3AED] hover:bg-[#6D28D9]'
                      }`}
                    >
                      {isAdded ? <Check size={15} /> : <ShoppingCart size={15} />}
                      {isAdded ? 'Added!' : 'Add To Cart'}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  )
}