import { PaginatedProductsResponse, Product } from "@/app/types/products";
import { apiRequest } from "@/app/api/client";

export const productApi = {
  getFeaturedProducts: async (): Promise<Product[]> => await apiRequest<PaginatedProductsResponse>(
      "products?isFeatured=true",
    ).then((res: PaginatedProductsResponse): Product[] => res.items),
  getProductsByCategory: async (categoryId: string): Promise<Product[]> =>
    apiRequest(`products/category/${categoryId}`),
  getProductsBySearch: async (searchTerm: string): Promise<Product[]> =>
    apiRequest(`products/search?q=${searchTerm}`),
  getProductBySlugs: (slugs: string[]) =>
    apiRequest(`products/${slugs.join(",")}`),
};