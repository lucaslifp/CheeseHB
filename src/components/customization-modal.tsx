"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Product, Extra } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

type PizzaSelectionState = 'half' | 'full';

export function CustomizationModal({ isOpen, onClose, product }: CustomizationModalProps) {
  const { addItem } = useCart();

  // State for Pizzas
  const [pizzaSelections, setPizzaSelections] = useState<Record<string, PizzaSelectionState>>({});
  
  // State for Lanches
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset state when product changes
    if (isOpen) {
      setPizzaSelections({});
      setSelectedExtras({});
    }
  }, [isOpen, product]);

  const handleFlavorClick = (flavor: string) => {
    setPizzaSelections(prev => {
      const newSelections = { ...prev };
      const currentState = newSelections[flavor];
      const halfCount = Object.values(newSelections).filter(s => s === 'half').length;

      if (!currentState) {
        if (halfCount < 2) {
          newSelections[flavor] = 'half';
        }
      } else if (currentState === 'half') {
        Object.keys(newSelections).forEach(key => delete newSelections[key]);
        newSelections[flavor] = 'full';
      } else if (currentState === 'full') {
        delete newSelections[flavor];
      }
      return newSelections;
    });
  };

  const handleExtraChange = (extraName: string, checked: boolean) => {
    setSelectedExtras(prev => ({ ...prev, [extraName]: checked }));
  };

  const { pizzaBannerText, pizzaBannerClass, canAddPizza, pizzaDetails } = useMemo(() => {
    if (product.category !== 'Pizzas') return {};
    const selectedFlavors = Object.entries(pizzaSelections);
    const fullPizza = selectedFlavors.find(([, state]) => state === 'full');
    const halfPizzas = selectedFlavors.filter(([, state]) => state === 'half');

    if (fullPizza) {
      return {
        pizzaBannerText: 'Pizza Inteira',
        pizzaBannerClass: 'bg-green-100 text-green-800',
        canAddPizza: true,
        pizzaDetails: `Inteira: ${fullPizza[0]}`,
      };
    }
    if (halfPizzas.length > 0) {
      const flavorNames = halfPizzas.map(([name]) => name).join(' e ');
      return {
        pizzaBannerText: `Meio a Meio (${halfPizzas.length}/2)`,
        pizzaBannerClass: 'bg-yellow-100 text-yellow-800',
        canAddPizza: halfPizzas.length > 0, // Can add even with 1 half
        pizzaDetails: `Meia: ${flavorNames}`,
      };
    }
    return {
      pizzaBannerText: 'Escolha até 2 sabores',
      pizzaBannerClass: 'bg-blue-100 text-blue-800',
      canAddPizza: false,
      pizzaDetails: '',
    };
  }, [pizzaSelections, product.category]);

  const { finalPrice, lancheDetails } = useMemo(() => {
    if (product.category !== 'Lanches') return { finalPrice: product.price, lancheDetails: '' };
    
    const extrasPrice = product.extras?.reduce((total, extra) => {
        return selectedExtras[extra.name] ? total + extra.price : total;
    }, 0) || 0;

    const detailsArray = product.extras?.filter(extra => selectedExtras[extra.name]).map(extra => extra.name) || [];

    return {
      finalPrice: product.price + extrasPrice,
      lancheDetails: detailsArray.length > 0 ? `Com: ${detailsArray.join(', ')}` : 'Simples',
    };
  }, [selectedExtras, product]);
  
  const handleAddToCart = () => {
    let cartItemPayload = {
      productId: product.id,
      name: product.name,
      quantity: 1,
      image: product.image,
      price: 0,
      details: '',
      id: ''
    };
    
    if (product.category === 'Pizzas' && canAddPizza && pizzaDetails) {
        cartItemPayload.price = product.price;
        cartItemPayload.details = pizzaDetails;
        cartItemPayload.id = `${product.id}-${Object.keys(pizzaSelections).sort().join('-')}`;
    } else if (product.category === 'Lanches' && lancheDetails) {
        cartItemPayload.price = finalPrice;
        cartItemPayload.details = lancheDetails;
        cartItemPayload.id = `${product.id}-${Object.keys(selectedExtras).filter(k => selectedExtras[k]).sort().join('-') || 'simples'}`;
    } else {
        return; // Cannot add
    }

    addItem(cartItemPayload);
    onClose();
  };
  
  const isPizza = product.category === 'Pizzas';
  const isLanche = product.category === 'Lanches';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Personalize seu Pedido</DialogTitle>
          <DialogDescription>{product.name}</DialogDescription>
        </DialogHeader>

        {isPizza && (
          <>
            <div className={cn("p-2 rounded-md text-center font-semibold", pizzaBannerClass)}>
              {pizzaBannerText}
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              {product.flavors?.map((flavor) => {
                const state = pizzaSelections[flavor];
                return (
                  <Button
                    key={flavor}
                    variant="outline"
                    className="h-auto py-4 flex-col relative"
                    onClick={() => handleFlavorClick(flavor)}
                  >
                    {flavor}
                    {state === 'half' && <Badge variant="destructive" className="absolute -top-2 -right-2 bg-orange-500 text-white">METADE</Badge>}
                    {state === 'full' && <Badge variant="destructive" className="absolute -top-2 -right-2 bg-green-600 text-white">INTEIRA</Badge>}
                  </Button>
                );
              })}
            </div>
          </>
        )}

        {isLanche && (
            <div className="space-y-4 py-4">
                <p className="font-semibold">Adicione extras:</p>
                <div className="space-y-2">
                    {product.extras?.map((extra) => (
                        <div key={extra.name} className="flex items-center justify-between p-2 rounded-md border">
                           <div className="flex items-center space-x-2">
                             <Checkbox 
                                id={extra.name}
                                checked={selectedExtras[extra.name] || false}
                                onCheckedChange={(checked) => handleExtraChange(extra.name, !!checked)}
                             />
                             <Label htmlFor={extra.name} className="cursor-pointer">{extra.name}</Label>
                           </div>
                           <span className="text-sm text-muted-foreground">
                                + {extra.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                           </span>
                        </div>
                    ))}
                </div>
                 <div className="flex justify-between font-bold text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>{finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
            </div>
        )}

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" onClick={handleAddToCart} disabled={isPizza && !canAddPizza} className="bg-primary hover:bg-primary/90">
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
