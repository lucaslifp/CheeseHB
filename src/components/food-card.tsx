"use client";

import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useState } from 'react';
import { CustomizationModal } from './customization-modal';
import { useCart } from '@/context/cart-context';

interface FoodCardProps {
  product: Product;
}

export function FoodCard({ product }: FoodCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem } = useCart();
  
  const isCustomizable = product.flavors || product.extras;

  const handleAddClick = () => {
    if (isCustomizable) {
      setIsModalOpen(true);
    } else {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        image: product.image,
        details: product.name,
      });
    }
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image src={product.image} alt={product.name} fill className="object-cover" data-ai-hint={product['data-ai-hint']} />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <CardTitle className="text-lg font-semibold font-headline">{product.name}</CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground flex-1">{product.description}</CardDescription>
          <p className="mt-4 text-xl font-bold text-foreground">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAddClick}>
            {isCustomizable ? 'Montar' : 'Adicionar'}
          </Button>
        </CardFooter>
      </Card>
      {isCustomizable && (
        <CustomizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
        />
      )}
    </>
  );
}
