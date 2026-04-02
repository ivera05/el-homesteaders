'use client';

import ProductCard from "@/app/components/ProductCard";
import ProductDrawer from "@/app/components/ProductDrawer";
import { useState } from "react";
import { Product } from "@/app/types";

type GridProps = {
  items: Product[];
}

export default function ProductGrid({ items = [] }: GridProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            name={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      <ProductDrawer
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
