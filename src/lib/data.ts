import { Product, Extra } from './types';

const pizzaFlavors = ['Calabresa', 'Mussarela', 'Frango com Catupiry', 'Portuguesa', 'Margherita', 'Quatro Queijos'];
const burgerExtras: Extra[] = [
  { name: 'Bacon Extra', price: 4.50 },
  { name: 'Queijo Cheddar Extra', price: 3.00 },
  { name: 'Ovo', price: 2.00 },
  { name: 'Cebola Caramelizada', price: 2.50 },
];
const hotDogExtras: Extra[] = [
    { name: 'Purê de Batata', price: 3.00 },
    { name: 'Bacon Bits', price: 2.50 },
    { name: 'Queijo Parmesão Ralado', price: 2.00 },
    { name: 'Batata Palha Extra', price: 1.50 },
];

export const products: Product[] = [
  // Pizzas
  {
    id: 'pizza-grande',
    name: 'Pizza Grande',
    description: 'Pizza grande de 8 fatias. Escolha até 2 sabores.',
    price: 55.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'large pizza',
    category: 'Pizzas',
    flavors: pizzaFlavors
  },
  {
    id: 'pizza-media',
    name: 'Pizza Média',
    description: 'Pizza média de 6 fatias. Escolha até 2 sabores.',
    price: 45.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'medium pizza',
    category: 'Pizzas',
    flavors: pizzaFlavors
  },
  // Lanches
  {
    id: 'lanche-hamburger',
    name: 'Hambúrguer Artesanal',
    description: 'Pão brioche, hambúrguer de 180g e queijo. Adicione extras!',
    price: 28.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'craft burger',
    category: 'Lanches',
    extras: burgerExtras
  },
  {
    id: 'lanche-hotdog',
    name: 'Hot Dog Especial',
    description: 'Pão macio, salsicha premium, molho e batata palha. Turbine com extras!',
    price: 18.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'special hotdog',
    category: 'Lanches',
    extras: hotDogExtras
  },
  // Bebidas
  {
    id: 'bebida-1',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante gelado para acompanhar sua refeição.',
    price: 12.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'coke bottle',
    category: 'Bebidas',
  },
  {
    id: 'bebida-2',
    name: 'Guaraná Antarctica 2L',
    description: 'Sabor brasileiro para sua refeição.',
    price: 11.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'soda bottle',
    category: 'Bebidas',
  },
  // Sobremesas
  {
    id: 'sobremesa-1',
    name: 'Brownie de Chocolate',
    description: 'Delicioso brownie com nozes e calda de chocolate.',
    price: 15.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'chocolate brownie',
    category: 'Sobremesas',
  },
  {
    id: 'sobremesa-2',
    name: 'Mousse de Maracujá',
    description: 'Mousse cremoso com calda de maracujá fresco.',
    price: 12.0,
    image: 'https://placehold.co/400x300.png',
    'data-ai-hint': 'passion fruit mousse',
    category: 'Sobremesas',
  },
];
