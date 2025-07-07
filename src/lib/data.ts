import type { Product, OptionGroup } from './types';

// --- Master List of All Option Groups ---

export const allOptionGroups: OptionGroup[] = [
  // Pizza Groups
  {
    id: 'group-pizza-salgada',
    name: 'Sabores Pizza Salgada',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
      { id: 'flavor-margherita', name: 'Margherita', price: 0, active: true },
      { id: 'flavor-pepperoni', name: 'Pepperoni', price: 2, active: true },
      { id: 'flavor-quatro-queijos', name: 'Quatro Queijos', price: 3, active: true },
      { id: 'flavor-frango-catupiry', name: 'Frango com Catupiry', price: 4, active: true },
      { id: 'flavor-portuguesa', name: 'Portuguesa', price: 2, active: true },
      { id: 'flavor-calabresa', name: 'Calabresa', price: 0, active: true },
    ],
  },
  {
    id: 'group-pizza-doce',
    name: 'Sabores Pizza Doce',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
      { id: 'flavor-nutella-morango', name: 'Nutella com Morangos', price: 8, active: true },
      { id: 'flavor-banana-canela', name: 'Banana com Canela', price: 5, active: true },
      { id: 'flavor-chocolate-branco-coco', name: 'Chocolate Branco com Coco', price: 7, active: true },
      { id: 'flavor-chocolate-branquinho', name: 'Chocolate com Branquinho', price: 6, active: true },
      { id: 'flavor-doce-leite-coco', name: 'Doce de Leite com Coco', price: 5, active: true },
    ],
  },
  {
    id: 'group-pizza-borda',
    name: 'Borda Recheada',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
      { id: 'borda-tradicional', name: 'Tradicional', price: 0, active: true },
      { id: 'borda-catupiry', name: 'Catupiry', price: 8.00, active: true },
      { id: 'borda-cheddar', name: 'Cheddar', price: 8.00, active: true },
      { id: 'borda-chocolate', name: 'Chocolate', price: 10.00, active: true },
    ],
  },
  {
    id: 'group-pizza-adicionais',
    name: 'Adicionais de Pizza',
    controlType: 'stepper',
    min: 0,
    max: 10,
    options: [
      { id: 'extra-bacon', name: 'Bacon', price: 5.00, active: true },
      { id: 'extra-milho', name: 'Milho', price: 3.00, active: true },
      { id: 'extra-azeitona', name: 'Azeitona', price: 2.50, active: true },
      { id: 'extra-champignon', name: 'Champignon', price: 4.00, active: true },
    ],
  },

  // Burger Groups
  {
    id: 'group-burger-bread',
    name: 'Pão de Hambúrguer',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
        { id: 'bread-brioche', name: 'Pão Brioche', price: 0, active: true },
        { id: 'bread-australiano', name: 'Pão Australiano', price: 2, active: true },
        { id: 'bread-gergelim', name: 'Pão com Gergelim', price: 0, active: true },
    ],
  },
  {
    id: 'group-burger-meat',
    name: 'Carne de Hambúrguer',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
        { id: 'meat-carne', name: 'Hambúrguer de Carne 150g', price: 0, active: true },
        { id: 'meat-frango', name: 'Hambúrguer de Frango', price: 0, active: true },
        { id: 'meat-vegetariano', name: 'Hambúrguer Vegetariano', price: 0, active: true },
    ],
  },
  {
    id: 'group-burger-extras',
    name: 'Adicionais de Hambúrguer',
    controlType: 'stepper',
    min: 0,
    max: 10,
    options: [
      { id: 'extra-burger-bacon', name: 'Bacon Extra', price: 4.50, active: true },
      { id: 'extra-burger-cheddar', name: 'Queijo Cheddar', price: 3.00, active: true },
      { id: 'extra-burger-ovo', name: 'Ovo', price: 2.00, active: true },
      { id: 'extra-burger-cebola', name: 'Cebola Caramelizada', price: 2.50, active: true },
    ],
  },

  // Hotdog Groups
  {
    id: 'group-hotdog-style',
    name: 'Estilo do Hot Dog',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
        { id: 'style-simples', name: 'Simples', price: 0, active: true },
        { id: 'style-prensado', name: 'Prensado', price: 1, active: true },
    ],
  },
  {
    id: 'group-hotdog-sausage',
    name: 'Salsicha do Hot Dog',
    controlType: 'radio',
    min: 1,
    max: 1,
    options: [
        { id: 'sausage-tradicional', name: 'Salsicha Tradicional', price: 0, active: true },
        { id: 'sausage-frango', name: 'Salsicha de Frango', price: 0, active: true },
        { id: 'sausage-artesanal', name: 'Linguiça Artesanal', price: 3, active: true },
    ],
  },
  {
    id: 'group-hotdog-extras',
    name: 'Adicionais de Hot Dog',
    controlType: 'stepper',
    min: 0,
    max: 10,
    options: [
      { id: 'extra-hotdog-pure', name: 'Purê de Batata', price: 3.00, active: true },
      { id: 'extra-hotdog-bacon', name: 'Bacon em Cubos', price: 2.50, active: true },
      { id: 'extra-hotdog-parmesao', name: 'Queijo Parmesão', price: 2.00, active: true },
      { id: 'extra-hotdog-palha', name: 'Batata Palha Extra', price: 1.50, active: true },
    ],
  },
  
  // Shared Groups
  {
    id: 'group-bebidas',
    name: 'Bebidas (Combo)',
    controlType: 'stepper',
    min: 0,
    max: 99,
    options: [
      { id: 'coca-cola-lata', name: 'Coca-Cola 350ml', price: 6.00, active: true },
      { id: 'guarana-lata', name: 'Guaraná Antarctica 350ml', price: 5.50, active: true },
      { id: 'agua-mineral', name: 'Água Mineral 500ml', price: 3.00, active: true },
    ]
  },
  {
    id: 'group-sobremesas',
    name: 'Sobremesas (Combo)',
    controlType: 'stepper',
    min: 0,
    max: 99,
    options: [
      { id: 'brownie-chocolate', name: 'Brownie de Chocolate', price: 15.00, active: true },
      { id: 'mousse-maracuja', name: 'Mousse de Maracujá', price: 12.00, active: true },
    ]
  },
];


// --- Product Definitions ---
const productsData: Omit<Product, 'optionGroups'>[] = [
  // Pizzas
  {
    id: 'pizza-grande',
    name: 'Pizza Grande',
    description: 'Monte sua pizza grande com seus sabores favoritos.',
    price: 55.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'large pizza',
    category: 'Pizzas',
    optionGroupIds: ['group-pizza-salgada', 'group-pizza-doce', 'group-pizza-borda', 'group-pizza-adicionais', 'group-bebidas', 'group-sobremesas']
  },
  {
    id: 'pizza-pequena',
    name: 'Pizza Pequena',
    description: 'Uma pizza pequena no tamanho ideal para você.',
    price: 35.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'small pizza',
    category: 'Pizzas',
    optionGroupIds: ['group-pizza-salgada', 'group-pizza-doce', 'group-pizza-borda', 'group-bebidas']
  },
  // Lanches
  {
    id: 'monte-seu-hamburguer',
    name: 'Hambúrguer Artesanal',
    description: 'Crie o hambúrguer perfeito com seus ingredientes favoritos.',
    price: 20.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'craft burger',
    category: 'Lanches',
    optionGroupIds: ['group-burger-bread', 'group-burger-meat', 'group-burger-extras', 'group-bebidas', 'group-sobremesas']
  },
  {
    id: 'monte-seu-hotdog',
    name: 'Hot Dog Especial',
    description: 'Personalize seu cachorro-quente do seu jeito.',
    price: 15.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'gourmet hotdog',
    category: 'Lanches',
    optionGroupIds: ['group-hotdog-style', 'group-hotdog-sausage', 'group-hotdog-extras', 'group-bebidas', 'group-sobremesas']
  },
  // Bebidas (Standalone)
  {
    id: 'coca-cola-lata-standalone',
    name: 'Coca-Cola 350ml',
    description: 'Lata de 350ml, gelada.',
    price: 6.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'coke can',
    category: 'Bebidas',
  },
  {
    id: 'guarana-lata-standalone',
    name: 'Guaraná Antarctica 350ml',
    description: 'Lata de 350ml, gelada.',
    price: 5.50,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'soda can',
    category: 'Bebidas',
  },
   {
    id: 'agua-mineral-standalone',
    name: 'Água Mineral 500ml',
    description: 'Garrafa de 500ml, sem gás.',
    price: 3.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'water bottle',
    category: 'Bebidas',
  },
  // Sobremesas (Standalone)
  {
    id: 'brownie-chocolate-standalone',
    name: 'Brownie de Chocolate',
    description: 'Delicioso brownie com nozes e calda de chocolate.',
    price: 15.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'chocolate brownie',
    category: 'Sobremesas',
  },
  {
    id: 'mousse-maracuja-standalone',
    name: 'Mousse de Maracujá',
    description: 'Mousse cremoso com calda de maracujá fresco.',
    price: 12.00,
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'passionfruit mousse',
    category: 'Sobremesas',
  },
];

// Hydrate products with their full option groups
export const products: Product[] = productsData.map(p => ({
  ...p,
  optionGroups: p.optionGroupIds
    ? allOptionGroups.filter(group => p.optionGroupIds!.includes(group.id))
    : [],
}));
