import ProductCard from "@/app/components/ProductCard";
import { productApi } from "@/app/api/products";

export default async function Home() {
  const products = await productApi.getFeaturedProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      {/* Featured Products */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif text-stone-800 dark:text-stone-100 mb-8 text-center">
          Featured Treats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} imageUrl={p.imageUrl} name={p.title} price={p.price} />
          ))}
        </div>
      </section>

      {/* Store Intro Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center bg-stone-50 p-10 rounded-3xl border border-stone-200">
        <div className="space-y-6">
          <h2 className="text-4xl font-serif text-stone-800">
            Pure Crunch, Real Flavor.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            At Homesteaders E&L, we take your favorite treats and transform them
            through the magic of freeze-drying. By removing moisture and
            intensifying flavor, we create a snacking experience that is airy,
            crunchy, and unlike anything else.
          </p>
          <p className="text-stone-600">
            From classic candies to locally sourced fruits, everything is
            processed right here with a focus on quality and freshness.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 bg-stone-300 rounded-2xl" />
          <div className="h-48 bg-stone-200 rounded-2xl mt-8" />
        </div>
      </section>
    </div>
  );
}
