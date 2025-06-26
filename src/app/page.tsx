"use client";

import * as React from 'react';
import { Header } from '@/components/header';
import { CategoryNav } from '@/components/category-nav';
import { FoodGrid } from '@/components/food-grid';
import { Cart } from '@/components/cart';
import { CartProvider } from '@/context/cart-context';
import { Product } from '@/lib/types';
import { products as allProducts } from '@/lib/data';
import { CartIcon } from '@/components/cart-icon';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Home() {
  const [category, setCategory] = React.useState('Todas');
  const [products, setProducts] = React.useState<Product[]>([]);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    setProducts(allProducts);
  }, []);

  const filteredProducts =
    category === 'Todas'
      ? products
      : products.filter((p) => p.category === category);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <CategoryNav selectedCategory={category} onSelectCategory={setCategory} />
        <div className="flex-1 container mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="flex-1">
              <FoodGrid products={filteredProducts} />
            </main>
            <aside className="hidden lg:block w-full lg:w-80 xl:w-96">
                <Cart />
            </aside>
          </div>
        </div>
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <div className="fixed bottom-4 right-4 z-50">
                <CartIcon />
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-4/5 flex flex-col">
              <SheetHeader>
                <SheetTitle>Seu Carrinho</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                 <Cart />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </CartProvider>
  );
}
