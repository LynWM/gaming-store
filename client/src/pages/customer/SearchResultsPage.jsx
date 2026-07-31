import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight, SearchX } from "lucide-react";

import ProductCard from "../../layouts/ProductCard";
import { categoryMeta } from "../../data/categoryData";
import { api } from "../../services/api";

const DEFAULT_META = {
  accent: { hex: "#7C3AED", from: "#2D1B4E", via: "#1B1030", rgb: "124,58,237" },
  ctaLabel: "Add to Cart"
};

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([api.searchProducts(q), api.getDeals()])
      .then(([apiProducts, deals]) => {
        if (cancelled) return;

        const dealsByProductId = new Map(deals.map((deal) => [deal.product_id, deal]));

        const merged = apiProducts.map((product) => {
          const deal = dealsByProductId.get(product.id);
          const meta = categoryMeta[product.category_slug] || DEFAULT_META;
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: deal ? deal.price : product.price,
            oldPrice: deal ? deal.oldPrice : null,
            rating: product.rating || 5,
            reviews: product.reviews || 0,
            tag: deal ? "Sale" : null,
            accent: meta.accent,
            ctaLabel: meta.ctaLabel
          };
        });

        setProducts(merged);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load search results");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#9C97A8]">Search</span>
        </nav>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
          </h1>
          {!loading && !error && q && (
            <p className="mt-2 text-sm text-[#9C97A8] font-medium">
              {products.length} product{products.length === 1 ? "" : "s"} found
            </p>
          )}
        </div>

        {loading && <p className="text-sm text-[#9C97A8]">Searching…</p>}

        {error && <p className="text-sm text-[#F87171]">Couldn't load results: {error}</p>}

        {!loading && !error && q && products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <SearchX size={36} className="text-[#4B4560]" />
            <p className="text-lg font-semibold">No products match &ldquo;{q}&rdquo;</p>
            <p className="text-sm text-[#9C97A8]">Try a different keyword or check the spelling.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}