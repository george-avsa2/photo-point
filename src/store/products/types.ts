export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CardProduct {id: number, quantity: number}

export interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  selectedProductsIds: CardProduct[];
}
