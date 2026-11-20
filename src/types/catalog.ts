export type ProductCategory = 'Trad-Modern' | 'Streetwear' | 'Accessories';

export type CategoryFilter = 'All' | ProductCategory;

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  fabricOrigin: string;
  priceNaira: number;
  description: string;
  craftNote: string;
  fitNote: string;
  image: string;
  imageAlt: string;
  colors: ProductColor[];
  sizes: string[];
  tag?: string;
}

export interface CartItem {
  key: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}
