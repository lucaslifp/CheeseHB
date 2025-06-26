export type Category = 'Pizzas' | 'Bebidas' | 'Sobremesas' | 'Lanches';

export interface Extra {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  flavors?: string[];
  extras?: Extra[];
  'data-ai-hint'?: string;
}

export interface CartItem {
  id: string; // Unique ID for the cart item, includes customizations
  productId: string;
  name:string;
  image: string;
  quantity: number;
  price: number; // Final price including extras
  details: string; // Description of customizations
}
