import { Heart, ShoppingCart, Star, Calendar, UserPlus } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";
import { Link } from "react-router-dom";

const CTA_ICONS = {
  "Book Now": Calendar,
  "Sign Up Now": UserPlus
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);
  const { name, image, price, oldPrice, rating, reviews, tag, accent, ctaLabel = "Add to Cart" } = product;
  const CtaIcon = CTA_ICONS[ctaLabel] || ShoppingCart;

  const tagStyles = {
    New: "bg-[#3B82F6]/15 text-[#60A5FA]",
    Hot: "bg-[#EF4444]/15 text-[#F87171]",
    Sale: "bg-[#10B981]/15 text-[#34D399]"
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] overflow-hidden transition-all duration-200 hover:-translate-y-1"
      style={{ ["--accent"]: accent.hex }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center transition-colors hover:bg-black/60"
      >
        <Heart
          size={16}
          className={saved ? "fill-[#EC4899] text-[#EC4899]" : "text-white/80"}
        />
      </button>

      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, rgba(${accent.rgb},0.35), transparent 60%), linear-gradient(135deg, ${accent.from}, ${accent.via})`
        }}
      >
        {tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${tagStyles[tag]}`}
          >
            {tag}
          </span>
        )}

        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300"
            style={{ boxShadow: `0 0 30px rgba(${accent.rgb},0.25)` }}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 min-h-10">
          {name}
        </h3>

        <div className="flex items-center gap-1.5">
          <Star size={13} className="fill-[#EAB308] text-[#EAB308]" />
          <span className="text-xs font-medium text-white/80">{rating}</span>
          <span className="text-xs text-[#6B6478]">({reviews})</span>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-lg font-extrabold text-white">KSH {price}</span>
          {oldPrice && (
            <span className="text-xs text-[#6B6478] line-through">KSH {oldPrice}</span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: accent.hex }}
        >
          <CtaIcon size={14} />
          {ctaLabel}
        </button>
      </div>
    </Link>
  );
}