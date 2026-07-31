import { useParams, Link } from "react-router-dom";
import { categories } from "../../data/categoryData";
import ProductDetailView from "../../layouts/ProductDetailView";

export default function ProductDetailPage() {
  const { slug, productId } = useParams();
  const category = categories[slug];
  const product = category?.products.find((p) => p.id === productId);

  if (!category || !product) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-semibold">Product not found</p>
        <p className="text-sm text-[#9C97A8]">We couldn't find that product in our catalog.</p>
        <Link
          to="/"
          className="mt-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-sm font-bold transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <ProductDetailView
      product={product}
      breadcrumb={[{ label: category.title, to: `/${slug}` }]}
    />
  );
}