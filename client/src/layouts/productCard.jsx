import { Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product }) {

    return (

        <div className="bg-[#161920] rounded-2xl overflow-hidden border border-[#262B38] hover:border-purple-600 transition">

            <div className="relative">

                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-60 object-cover"
                />

                <span className="absolute left-4 top-4 bg-red-500 px-3 py-1 rounded text-xs font-bold">

                    {product.badge}

                </span>

                <button className="absolute right-4 top-4 w-10 h-10 rounded-full bg-[#0B0712]/80 flex justify-center items-center">

                    <Heart size={18} />

                </button>

            </div>

            <div className="p-5">

                <h3 className="font-semibold text-lg">

                    {product.title}

                </h3>

                <div className="flex gap-1 mt-2">

                    {[...Array(5)].map((_, i) => (

                        <Star

                            key={i}

                            size={15}

                            fill={i < product.rating ? "#FFD43B" : "none"}

                            className="text-yellow-400"

                        />

                    ))}

                </div>

                <div className="flex items-center gap-3 mt-4">

                    <span className="text-xl font-bold">

                        ${product.price}

                    </span>

                    <span className="line-through text-gray-500">

                        ${product.oldPrice}

                    </span>

                </div>

                <button className="mt-5 bg-purple-600 hover:bg-purple-700 rounded-lg w-full py-3 flex justify-center gap-2">

                    <ShoppingCart size={18} />

                    Add to Cart

                </button>

            </div>

        </div>

    );

}