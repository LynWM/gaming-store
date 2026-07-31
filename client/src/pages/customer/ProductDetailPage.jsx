import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductDetailView from "../../layouts/ProductDetailView";
import { categoryMeta } from "../../data/categoryData";
import { api } from "../../services/api";

const DEFAULT_META = {
  accent: { hex: "#7C3AED", from: "#2D1B4E", via: "#1B1030", rgb: "124,58,237" },
  ctaLabel: "Add to Cart"
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([api.getProduct(productId), api.getDeals()])
      .then(([apiProduct, deals]) => {
        if (cancelled) return;

        const deal = deals.find((d) => d.product_id === apiProduct.id);
        const meta = categoryMeta[apiProduct.category_slug] || DEFAULT_META;

        setProduct({
          id: apiProduct.id,
          name: apiProduct.name,
          description: apiProduct.description,
          image: apiProduct.image,
          price: deal ? deal.price : apiProduct.price,
          oldPrice: deal ? deal.oldPrice : null,
          rating: apiProduct.rating || 5,
          reviews: apiProduct.reviews || 0,
          tag: deal ? "Sale" : null,
          accent: meta.accent,
          ctaLabel: meta.ctaLabel,
          category_slug: apiProduct.category_slug,
          category: apiProduct.category
        });
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load product");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex items-center justify-center">
        <p className="text-sm text-[#9C97A8]">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-semibold">Product not found</p>
        <p className="text-sm text-[#9C97A8]">
          {error || "We couldn't find that product in our catalog."}
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

  const categoryTitle = categoryMeta[product.category_slug]?.title || product.category;

  return (
    <ProductDetailView
      product={product}
      breadcrumb={
        product.category_slug
          ? [{ label: categoryTitle, to: `/${product.category_slug}` }]
          : []
      }
    />
  );
}