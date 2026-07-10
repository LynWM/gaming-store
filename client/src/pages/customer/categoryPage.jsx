import { useParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

import ProductCard from "../../components/ProductCard";
import { categories } from "../../data/categoryData";

export default function CategoryPage() {

    const { slug } = useParams();

    const category = categories[slug];

    if (!category)

        return (

            <div className="text-white flex justify-center items-center h-screen">

                Category Not Found

            </div>

        );

    const Icon = category.icon;

    return (

        <div className="max-w-[1500px] mx-auto px-6 py-8 text-white">

            <section
                className="rounded-3xl p-10 mb-10"
                style={{
                    background:
                        "linear-gradient(90deg,#9333EA,#6D28D9)"
                }}
            >

                <div className="flex justify-between flex-wrap gap-10">

                    <div className="flex gap-6">

                        <div className="w-28 h-28 rounded-3xl bg-white/10 flex justify-center items-center">

                            <Icon size={50} />

                        </div>

                        <div>

                            <h1 className="text-6xl font-black">

                                {category.title}

                            </h1>

                            <p className="mt-3 text-xl text-purple-100">

                                {category.description} • {category.products.length} Products

                            </p>

                        </div>

                    </div>

                    <div className="flex gap-3 flex-wrap">

                        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">

                            Featured

                        </button>

                        <button className="bg-white/10 px-6 py-3 rounded-xl">

                            Price ↑

                        </button>

                        <button className="bg-white/10 px-6 py-3 rounded-xl">

                            Price ↓

                        </button>

                        <button className="bg-white/10 px-6 py-3 rounded-xl flex gap-2">

                            <SlidersHorizontal size={18} />

                            Top Rated

                        </button>

                    </div>

                </div>

            </section>

            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {category.products.map(product => (

                    <ProductCard

                        key={product.id}

                        product={product}

                    />

                ))}

            </section>

        </div>

    );

}