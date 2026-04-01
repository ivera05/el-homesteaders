interface Inventory {
  id: string;
  availableQty: number;
  pendingShipQty: number;
  shippedQty: number;
  processingQty: number;
  lowStockThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

interface NutritionalInfo {
  calories: number;
  ingredients: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  sku: string;
  weight: number;
  weightUnit: string;
  nutritionalInfo: NutritionalInfo;
  isFeatured: boolean;
  featuredUntil?: Date;
  inventory: Inventory;
  createdAt: Date;
  updatedAt: Date;
}

export type PaginatedProductsResponse = {
  items: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
