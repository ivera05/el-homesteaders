"use client";

import { useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import ProductDrawer from "@/app/components/ProductDrawer";
import CartDrawer from "@/app/components/CartDrawer";
import { cartsApi } from "@/app/lib/api/carts";
import { CartSummary } from "@/app/lib/types/carts";
import { Product } from "@/app/lib/types";

type GridProps = {
  items: Product[];
};

type DrawerState =
  | { type: "product"; product: Product }
  | { type: "cart" }
  | null;

export default function ProductGrid({ items = [] }: GridProps) {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const closeDrawer = () => setDrawer(null);

  const handleOpenProduct = (product: Product) => {
    setDrawer({ type: "product", product });
  };

  const handleAddToCart = async (product: Product) => {
    try {
      setIsAddingToCart(true);

      const cartItem = await cartsApi.addToCart({
        slug: product.slug,
        quantity: 1,
      });

      const nextCart: CartSummary = {
        id: cartItem.cartId,
        items: [
          {
            id: cartItem.id,
            quantity: cartItem.quantity,
            product: {
              id: cartItem.product.id,
              title: cartItem.product.title,
              slug: cartItem.product.slug,
              imageUrl: cartItem.product.imageUrl,
              price: cartItem.product.price,
            },
          },
        ],
        subtotal: cartItem.quantity * cartItem.product.price,
        total: cartItem.quantity * cartItem.product.price,
      };

      setCart(nextCart);
      setDrawer({ type: "cart" });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            name={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            onSelect={() => handleOpenProduct(product)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {drawer?.type === "product" && (
        <ProductDrawer product={drawer.product} isOpen onClose={closeDrawer} />
      )}

      {drawer?.type === "cart" && (
        <CartDrawer cart={cart} isOpen onClose={closeDrawer} />
      )}
    </>
  );
}
