export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CardProduct extends Product {
  quantity: number;
}

export interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  selectedProductsIds: CardProduct[];
}
