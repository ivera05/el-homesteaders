import { CategoryMenuItem, CategoryPaginatedProductsResponse } from "@/app/types/categories";
import { apiRequest } from "@/app/api/client";

export const categoriesApi = {
  getMenu: async (): Promise<CategoryMenuItem[]> => await apiRequest('categories/menu'),
  getCategoryProducts: async (slug: string): Promise<CategoryPaginatedProductsResponse> => await apiRequest(`categories/${slug}/products`)
};
