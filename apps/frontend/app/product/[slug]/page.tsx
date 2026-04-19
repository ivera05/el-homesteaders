import { productApi } from "@/app/lib/api/products";
import { ProductPageProps } from "@/app/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import NutritionLabel from "@/app/components/NutritionalLabel";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await productApi.getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Product Images */}
        <div className="sticky top-24">
          <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden relative">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Product Image Coming Soon
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {product.title}
          </h1>
          <p className="text-slate-500 text-lg mb-6">SKU: {product.sku}</p>

          <div className="text-3xl font-semibold text-slate-900 mb-8">
            ${product.price.toFixed(2)}
            <span className="text-sm text-slate-400 ml-2 font-normal">
              ({product.weight}
              {product.weightUnit})
            </span>
          </div>

          <div className="prose prose-slate mb-10">
            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <button className="w-full lg:w-2/3 bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-transform active:scale-[0.98] mb-10">
            Add to Cart
          </button>

          {/* Nutrition Section */}
          <div className="border-t border-slate-100">
            <h3 className="text-xl font-bold mb-6">Product Information</h3>
            <NutritionLabel info={product.nutritionalInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
