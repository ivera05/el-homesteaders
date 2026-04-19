import { apiRequest } from "@/app/lib/api/client";
import { AddToCartArgs, CartItem } from "@/app/lib/types/carts";

export const cartsApi = {
  addToCart: async ({ slug, quantity = 1 }: AddToCartArgs): Promise<CartItem> => {

    return await apiRequest("carts/add", {
      method: "POST",
      body: JSON.stringify({
        slug,
        quantity,
      }),
    });
  },
};
