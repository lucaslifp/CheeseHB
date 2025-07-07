"use client";

import { Product } from "@/lib/types";
import { FoodCard } from "./food-card";
import { AnimatePresence } from "framer-motion";

interface FoodGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function FoodGrid({ products, onProductClick }: FoodGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence>
        {products.map((product) => (
            <FoodCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
        ))}
      </AnimatePresence>
    </div>
  );
}
