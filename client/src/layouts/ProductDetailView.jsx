import { Link } from "react-router-dom";
import { ChevronRight, Heart, ShoppingCart, Star, Calendar, UserPlus } from "lucide-react";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";

const CTA_ICONS = {
  "Book Now": Calendar,
  "Sign Up Now": UserPlus
};

const TAG_STYLES = {
  New: "bg-[#3B82F6]/15 text-[#60A5FA]",
  Hot: "bg-[#EF4444]/15 text-[#F87171]",
  Sale: "bg-[#10B981]/15 text-[#34D399]",
  DEAL: "bg-[#7C3AED]/20 text-[#C4B5FD]",
  SALE: "bg-[#F43F5E]/20 text-[#FB7185]",
  HOT: "bg-[#F59E0B]/20 text-[#FBBF24]"
};

export default function ProductDetailView({ product, breadcrumb = [] }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const {
    name,
    price,
    oldPrice,
    rating,
    reviews,
    tag,
    badge,
    accent,
    image,
    ctaLabel = "Add to Cart",
    description,
    details = [],
    specs = {}
  } = product;

  const saved = isInWishlist(product.id);
  const CtaIcon = CTA_ICONS[ctaLabel] || ShoppingCart;
  const badgeLabel = tag || badge;

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478] flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          {breadcrumb.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight size={12} />
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-white transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-[#9C97A8]">{crumb.label}</span>
              )}
            </span>
          ))}
          <ChevronRight size={12} />
          <span className="text-[#9C97A8]">{name}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-2">
          <div
            className="relative overflow-hidden rounded-2xl border border-[#231C30] min-h-88 flex items-center justify-center"
            style={
              image
                ? undefined
                : {
                    background: accent
                      ? `radial-gradient(circle at 30% 20%, rgba(${accent.rgb},0.35), transparent 60%), linear-gradient(135deg, ${accent.from}, ${accent.via})`
                      : "#1B1625"
                  }
            }
          >
            {badgeLabel && (
              <span
                className={`absolute top-4 left-4 z-10 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${TAG_STYLES[badgeLabel] || "bg-white/10 text-white"}`}
              >
                {badgeLabel}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center transition-colors hover:bg-black/60"
            >
              <Heart size={18} className={saved ? "fill-[#EC4899] text-[#EC4899]" : "text-white/80"} />
            </button>

            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-32 h-32 rounded-3xl border border-white/10 bg-white/5"
                style={accent ? { boxShadow: `0 0 60px rgba(${accent.rgb},0.3)` } : undefined}
              />
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">{name}</h1>
              {description && <p className="mt-2 text-sm text-[#9C97A8] font-medium">{description}</p>}
            </div>

            <div className="flex items-center gap-2">
              <Star size={16} className="fill-[#EAB308] text-[#EAB308]" />
              <span className="text-sm font-semibold text-white">{rating}</span>
              <span className="text-sm text-[#6B6478]">({Number(reviews).toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-white">KSh {Number(price).toLocaleString()}</span>
              {oldPrice && (
                <span className="text-base text-[#6B6478] line-through">KSh {Number(oldPrice).toLocaleString()}</span>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full sm:w-fit flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent ? accent.hex : "#7C3AED" }}
            >
              <CtaIcon size={16} />
              {ctaLabel}
            </button>

            {Object.keys(specs).length > 0 && (
              <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-[#9C97A8] mb-3">Specifications</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(specs).map(([label, value]) => (
                    <div key={label} className="flex justify-between sm:flex-col sm:justify-start gap-1 text-sm">
                      <dt className="text-[#6B6478]">{label}</dt>
                      <dd className="font-semibold text-white text-right sm:text-left">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>

        {details.length > 0 && (
          <section className="rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] p-8 max-w-3xl">
            <h2 className="text-xl font-bold tracking-tight mb-4">Product details</h2>
            <div className="flex flex-col gap-4">
              {details.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#C9C4D6]">{paragraph}</p>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}