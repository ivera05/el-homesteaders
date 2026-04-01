import { Product } from "@/app/types/products";

export interface CategoryMenuItem {
  id: string;
  slug: string;
  name: string;
  children?: CategoryMenuItem[];
}

export interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export interface CategoryPaginatedProductsResponse {
  items: Product[];
  category: Category;
  meta: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
}

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
  parent?: Category;
  children?: Category[];
}