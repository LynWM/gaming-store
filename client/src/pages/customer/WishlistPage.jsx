import { Heart, Trash2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/wishlistContext";
import ProductCard from "../../layouts/ProductCard";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-4">
        <Heart size={48} className="text-[#6B6478]" />
        <p className="text-lg font-semibold">Your wishlist is empty</p>
        <p className="text-sm text-[#9C97A8]">Save products you love to your wishlist.</p>
        <Link
          to="/"
          className="mt-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm font-bold transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#9C97A8]">Wishlist</span>
        </nav>

        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Wishlist</h1>
          <span className="text-sm text-[#9C97A8]">{items.length} items</span>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center transition-colors hover:bg-black/80"
                aria-label="Remove from wishlist"
              >
                <Trash2 size={14} className="text-[#F87171]" />
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}