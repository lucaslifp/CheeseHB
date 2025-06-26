"use client";

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import type { Category } from '@/lib/types';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories: (Category | 'Todas')[] = ['Todas', 'Pizzas', 'Bebidas', 'Sobremesas', 'Lanches'];

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center space-x-2 md:space-x-4 overflow-x-auto pb-2 -mb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'ghost'}
              className={cn(
                "rounded-full shrink-0",
                selectedCategory === category && "bg-primary hover:bg-primary/90"
              )}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
