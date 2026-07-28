import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

import ProductCard from "../../layouts/ProductCard";
import { categories } from "../../data/categoryData";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "rating", label: "Top Rated" }
];

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories[slug];
  const [sort, setSort] = useState("featured");

  const sortedProducts = useMemo(() => {
    if (!category) return [];
    const list = [...category.products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [category, sort]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-semibold">Category not found</p>
        <p className="text-sm text-[#9C97A8]">
          "{slug}" doesn't match anything in the catalog.
        </p>
        <Link
          to="/"
          className="mt-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm font-bold transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const Icon = category.icon;
  const { hex, from, via } = category.accent;

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[#9C97A8]">{category.title}</span>
        </nav>

        <section
          className="relative overflow-hidden rounded-2xl border border-[#2D224E] p-10"
          style={{
            background: `linear-gradient(120deg, ${from}, ${via})`
          }}
        >
          <div
            className="absolute -right-10 -top-10 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ backgroundColor: hex }}
          />

          <div className="relative z-10 flex justify-between flex-wrap gap-8">
            <div className="flex gap-6 items-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10"
                style={{ backgroundColor: `${hex}26` }}
              >
                <Icon size={34} style={{ color: hex }} />
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  {category.title}
                </h1>
                <p className="mt-2 text-sm text-[#C9C4D6] font-medium">
                  {category.description} · {category.products.length} products
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 flex-wrap items-center h-fit">
              {SORTS.map((s) => {
                const active = sort === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      active
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {s.id === "rating" && <SlidersHorizontal size={15} />}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </div>
  );
}
