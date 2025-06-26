import { Product } from '@/lib/types';
import { FoodCard } from './food-card';

interface FoodGridProps {
  products: Product[];
}

export function FoodGrid({ products }: FoodGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <FoodCard key={product.id} product={product} />
      ))}
    </div>
  );
}
