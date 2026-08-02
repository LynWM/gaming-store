import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../../layouts/ProductCard";
import { api } from "../../services/api";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
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

    api.getProducts({ search: q })
      .then((data) => {
        if (cancelled) return;
        setProducts(
          data.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            image: p.image,
            price: p.price,
            oldPrice: null,
            rating: p.rating || 5,
            reviews: p.reviews || 0,
            tag: null,
            accent: { hex: "#7C3AED", from: "#2D1B4E", via: "#1B1030", rgb: "124,58,237" },
            ctaLabel: "Add to Cart"
          }))
        );
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Search failed");
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
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {q ? `Search results for "${q}"` : "Search"}
          </h1>
          {!loading && q && (
            <p className="mt-1 text-sm text-[#9C97A8]">{products.length} result{products.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {loading && <p className="text-sm text-[#9C97A8]">Searching…</p>}
        {error && <p className="text-sm text-[#F87171]">Couldn't search: {error}</p>}

        {!loading && !error && q && products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm text-[#9C97A8]">Try a different search term.</p>
            <Link to="/" className="mt-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm font-bold transition-colors">
              Back to home
            </Link>
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