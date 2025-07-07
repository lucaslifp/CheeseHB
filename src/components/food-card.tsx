"use client";

import { Product } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface FoodCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function FoodCard({ product, onProductClick }: FoodCardProps) {

  const renderActionButton = () => {
    if (product.category === "Pizzas" || product.category === "Lanches") {
      return (
        <Button
          onClick={() => onProductClick(product)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          {product.category === "Pizzas" ? "Monte sua Pizza" : "Monte o seu"}
        </Button>
      );
    }
    return (
      <Button
        onClick={() => onProductClick(product)}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
      >
        Adicionar
        <Plus className="ml-2 h-4 w-4" />
      </Button>
    );
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out h-full border">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4 bg-white">
          <CardTitle className="text-lg font-bold mb-1 text-gray-900">{product.name}</CardTitle>
          <CardDescription className="text-sm text-gray-600 mb-4 flex-grow">
            {product.description}
          </CardDescription>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xl font-bold text-primary">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <div className="w-32">
              {renderActionButton()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
