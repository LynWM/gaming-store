import { useParams, Link } from "react-router-dom";
import FLASH_DEALS from "../../data/flashdeals";
import ProductDetailView from "../../layouts/ProductDetailView";

export default function FlashDealDetailPage() {
  const { productSlug } = useParams();
  const product = FLASH_DEALS.find((item) => item.link === `/products/${productSlug}`);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0B0712] text-white flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-semibold">Deal not found</p>
        <p className="text-sm text-[#9C97A8]">This flash deal may have expired or sold out.</p>
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
      breadcrumb={[{ label: "Flash Deals", to: "/flash-deals" }]}
    />
  );
}
