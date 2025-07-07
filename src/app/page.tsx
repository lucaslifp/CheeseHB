"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { CategoryNav } from "@/components/category-nav";
import { FoodGrid } from "@/components/food-grid";
import { Cart } from "@/components/cart";
import { CartProvider, useCart } from "@/context/cart-context";
import { Product } from "@/lib/types";
import { products as allProducts } from "@/lib/data";
import { CartIcon } from "@/components/cart-icon";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PizzaModal } from "@/components/ui/PizzaModal";
import { FastFoodModal } from "@/components/ui/FastFoodModal";
import { motion, AnimatePresence } from "framer-motion";

function PageContent() {
  const [category, setCategory] = React.useState("Todas");
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const isMobile = useIsMobile();
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = React.useState(false);
  const [selectedProductForCustomization, setSelectedProductForCustomization] = React.useState<Product | null>(null);
  const { addItem } = useCart();

  React.useEffect(() => {
    // Filter out standalone items that are also offered as addons in modals
    const mainProducts = allProducts.filter(p => !p.id.endsWith('-standalone'));
    setProducts(mainProducts);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category === "Todas" || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product: Product) => {
    if (product.category === "Pizzas" || product.category === "Lanches") {
      setSelectedProductForCustomization(product);
      setIsCustomizationModalOpen(true);
    } else {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        quantity: 1,
        image: product.image,
        price: product.price,
        details: "",
      });
    }
  };

  const handleCloseCustomizationModal = () => {
    setIsCustomizationModalOpen(false);
    setSelectedProductForCustomization(null);
  };

  const renderModal = () => {
    if (!selectedProductForCustomization) return null;

    if (selectedProductForCustomization.category === "Pizzas") {
      return (
        <PizzaModal
          isOpen={isCustomizationModalOpen}
          onClose={handleCloseCustomizationModal}
          product={selectedProductForCustomization}
        />
      );
    }
    
    if (selectedProductForCustomization.category === "Lanches") {
       return (
        <FastFoodModal
          isOpen={isCustomizationModalOpen}
          onClose={handleCloseCustomizationModal}
          product={selectedProductForCustomization}
        />
      );
    }

    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header search={search} setSearch={setSearch} />
      <CategoryNav selectedCategory={category} onSelectCategory={setCategory} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Cardápio</h2>
            <AnimatePresence>
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FoodGrid
                  products={filteredProducts}
                  onProductClick={handleProductClick}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden lg:block lg:sticky lg:top-24">
            <Cart />
          </div>
        </div>
      </main>

      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <div className="fixed bottom-6 right-6 z-50 drop-shadow-2xl">
              <CartIcon />
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85%] rounded-t-3xl shadow-2xl border-t bg-white">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-center text-gray-900">Seu Carrinho</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-2 pt-4 pb-6 h-full">
              <Cart />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {renderModal()}
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  );
}
