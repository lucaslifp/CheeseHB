export type Category = 'Pizzas' | 'Bebidas' | 'Sobremesas' | 'Lanches';

export interface OptionItem {
  id: string;
  name: string;
  price: number;
  active?: boolean;
}

export interface OptionGroup {
  id: string;
  name: string; // e.g., "Escolha o Pão", "Adicionais"
  controlType: 'radio' | 'stepper';
  min: number; // Minimum number of selections required
  max: number; // Maximum number of selections allowed
  options: OptionItem[];
}

export interface Product {
  id: string;
  name:string;
  description: string;
  price: number; // Base price
  image: string;
  category: Category;
  'data-ai-hint'?: string;
  optionGroups?: OptionGroup[]; // Populated dynamically based on IDs
  optionGroupIds?: string[]; // Stores linked group IDs
}

export interface CartItem {
  id: string; // Composite ID for uniqueness
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number; // Final price of the customized item
  details: string;
}
