"use client";

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import type { Category } from '@/lib/types';
import { motion } from 'framer-motion';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories: (Category | 'Todas')[] = ['Todas', 'Pizzas', 'Lanches', 'Bebidas', 'Sobremesas'];

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <nav className="sticky top-[65px] z-30 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 md:space-x-2 overflow-x-auto py-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={'ghost'}
              className={cn(
                "rounded-full shrink-0 relative px-4 py-2 text-sm font-semibold transition-colors duration-200",
                "hover:bg-primary/10",
                selectedCategory !== category && 'text-gray-600'
              )}
              onClick={() => onSelectCategory(category)}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
