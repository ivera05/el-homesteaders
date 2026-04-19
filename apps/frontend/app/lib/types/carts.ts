export interface AddToCartArgs {
  slug: string;
  quantity?: number;
}

export interface CartItem {
  id: string;
  cartId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

export interface CartItemSummary {
  id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    price: number;
  };
}

export interface CartSummary {
  id: string;
  items: CartItemSummary[];
  subtotal: number;
  total: number;
}

export interface CartDrawerProps {
  cart: CartSummary | null;
  isOpen: boolean;
  onClose: () => void;
}