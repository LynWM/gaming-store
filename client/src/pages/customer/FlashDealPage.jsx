import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";
import { api } from "../../services/api";

const BADGE_STYLES = {
  DEAL: "bg-[#7C3AED] text-white",
  SALE: "bg-[#F43F5E] text-white",
  HOT: "bg-[#F59E0B] text-[#1C1200]"
};

export default function FlashDealsPage() {
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    api.getDeals()
      .then(setDeals)
      .catch((err) => setError(err.message || "Failed to load deals"))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId((current) => (current === product.id ? null : current)), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Flash Deals</h1>

        {loading && <p className="text-sm text-[#9C97A8]">Loading deals…</p>}
        {error && <p className="text-sm text-[#F87171]">Couldn't load deals: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {deals.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <Link
                  key={product.id}
                  to={product.link}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] hover:border-[#7C3AED]"
                >
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                      <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md ${BADGE_STYLES[product.badge] || BADGE_STYLES.DEAL}`}>
                        {product.badge}
                      </span>
                      <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-black/60 text-[#FB7185] border border-[#F43F5E]/30 backdrop-blur-sm">
                        {product.discount}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#FB7185] hover:border-[#F43F5E]/40 backdrop-blur-sm"
                    >
                      <Heart size={15} />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-[15px] font-bold tracking-tight text-white leading-snug">{product.name}</h3>
                    <p className="text-[13px] text-gray-400 font-medium mt-0.5">{product.description}</p>

                    <div className="flex items-center gap-1 mt-2.5">
                      {[...Array(product.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#EAB308] text-[#EAB308]" />
                      ))}
                      <span className="text-[11px] text-[#655F75] ml-1.5 font-medium">
                        ({(product.reviews || 0).toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mt-4">
                      <span className="text-xl font-extrabold text-white tracking-tight">
                        KSh {product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-[#655F75] line-through font-medium">
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
        )}
      </main>
    </div>
  );
}