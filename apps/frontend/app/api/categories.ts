import { CategoryMenuItem } from "@/app/types/categories";
import { apiRequest } from "@/app/api/client";

export const categoriesApi = {
  getMenu: async (): Promise<CategoryMenuItem[]> => await apiRequest('categories/menu'),
  getCategories: async () => await apiRequest('categories')
};
