import { PaginatedProductsResponse, Product } from "@/app/lib/types/products";
import { apiRequest } from "@/app/lib/api/client";

export const productApi = {
  getFeaturedProducts: async (): Promise<Product[]> => await apiRequest<PaginatedProductsResponse>(
      'products?isFeatured=true',
    ).then((res: PaginatedProductsResponse): Product[] => res.items),
  getProductBySlug: (slug: string): Promise<Product> =>
    apiRequest(`products/${slug}`),
};