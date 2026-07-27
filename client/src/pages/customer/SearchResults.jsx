import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../layouts/ProductCard";
import { categories } from "../../data/categoryData";
import FLASH_DEALS from "../../data/flashdeals";

const allCategoryProducts = Object.entries(categories).flatMap(
  ([categorySlug, category]) =>
    category.products.map((product) => ({
      ...product,
      categorySlug,
      categoryName: category.title,
      type: "category"
    }))
);

const flashDealResults = FLASH_DEALS.map((deal) => ({
  ...deal,
  type: "flash"
}));

const allSearchItems = [...allCategoryProducts, ...flashDealResults];

function FlashDealCard({ deal }) {
  return (
    <Link
      to={deal.link}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#231C30] bg-linear-to-b from-[#1B1625] to-[#110D1A] hover:border-[#7C3AED] transition-all duration-200"
    >
      <div className="relative overflow-hidden">
        <img
          src={deal.image}
          alt={deal.name}
          className="h-52 w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-[#7C3AED] text-white">
            {deal.badge}
          </span>
          <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md bg-black/60 text-[#FB7185] border border-[#F43F5E]/30">
            {deal.discount}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white leading-snug">
            {deal.name}
          </h3>
          <p className="text-[13px] text-gray-400 mt-1">
            {deal.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              KSh {deal.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#6B6478] line-through ml-2">
              KSh {deal.oldPrice.toLocaleString()}
            </span>
          </div>
          <div className="text-[#9C97A8] text-xs font-medium py-1 px-2 rounded-full border border-white/10 bg-white/5">
            Flash Deal
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const normalizedQuery = query.toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return allSearchItems.filter((item) => {
      const name = item.name.toLowerCase();
      const description = item.description ? item.description.toLowerCase() : "";
      const category = item.categoryName ? item.categoryName.toLowerCase() : "";
      return (
        name.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        category.includes(normalizedQuery)
      );
    });
  }, [normalizedQuery]);

  return (
    <div className="min-h-screen bg-[#0B0712] text-white font-sans antialiased">
      <main className="max-w-350 mx-auto px-8 py-8 flex flex-col gap-8">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-[#6B6478]">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ArrowRight size={12} />
          <span className="text-[#9C97A8]">Search</span>
        </nav>

        <section className="rounded-2xl border border-[#2D224E] bg-linear-to-r from-[#201538] to-[#120D24] p-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[11px] uppercase font-bold tracking-widest text-purple-400">
                Search Catalog
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight mt-2">
                {query ? `Results for "${query}"` : "Search the store"}
              </h1>
            </div>
            <p className="text-sm text-[#C9C4D6] max-w-2xl">
              {query
                ? `Showing ${results.length} result${results.length === 1 ? "" : "s"} across categories and flash deals.`
                : "Enter a search term in the navbar to look for consoles, games, accessories, services, and more."}
            </p>
          </div>
        </section>

        {query ? (
          results.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((item) =>
                item.type === "category" ? (
                  <ProductCard key={item.id} product={item} />
                ) : (
                  <FlashDealCard key={item.id} deal={item} />
                )
              )}
            </section>
          ) : (
            <section className="rounded-2xl border border-[#2D224E] bg-[#110D1A]/90 p-8 text-center">
              <p className="text-lg font-semibold text-white">No results found</p>
              <p className="mt-2 text-sm text-[#9C97A8]">
                Try a broader search term like "monitor", "controller", "laptop" or "game".
              </p>
            </section>
          )
        ) : (
          <section className="rounded-2xl border border-[#2D224E] bg-[#110D1A]/90 p-8 text-center">
            <p className="text-lg font-semibold text-white">Search for products in the navbar above</p>
            <p className="mt-2 text-sm text-[#9C97A8]">
              Search results will appear here once you submit a query.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
