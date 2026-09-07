export type CategorySlug = 'all' | 'hoodies' | 'tees' | 'pantalones';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug | string;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'OVERSIZED' | string;
  color: string;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string[];
  densityGsm: number; // e.g. 200 GSM
  price: number; // in COP
  compareAtPrice?: number; // e.g. 240000 COP
  badge?: string; // e.g. "200 GSM", "PIEZA INSIGNIA", "EDICIÓN LUXE"
  categorySlug: CategorySlug;
  images: ProductImage[];
  variants: ProductVariant[];
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CartItem {
  id: string; // unique item key e.g. productId-size
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface AtelierLook {
  id: string;
  key: 'night' | 'cold' | 'minimal' | string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice: number;
  includedItems: {
    name: string;
    description: string;
    productSlug?: string;
  }[];
  imageUrl?: string;
  isPopular?: boolean;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  notes?: string;
}

export interface OrderItemPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CreateOrderDto {
  customer: OrderCustomer;
  items: OrderItemPayload[];
  notes?: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string; // e.g. PBM-2026-000001
  status: OrderStatus;
  subtotal: number;
  total: number;
  customer: OrderCustomer;
  items: {
    productName: string;
    variantSize?: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  whatsAppUrl: string;
  createdAt: string;
}

export interface SavingsComparison {
  piecesCount: number;
  workshopPricePerUnit: number;
  mallPricePerUnit: number;
  savingsPerUnit: number;
  totalWorkshopPrice: number;
  totalMallPrice: number;
  totalSavings: number;
}
