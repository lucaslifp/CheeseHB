"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/context/cart-context';
import { Badge } from './ui/badge';

export function CartIcon() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Button size="icon" className="rounded-full h-14 w-14 shadow-lg relative bg-primary hover:bg-primary/90">
      <ShoppingCart className="h-7 w-7" />
      {itemCount > 0 && (
        <Badge
          variant="secondary"
          className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold"
        >
          {itemCount}
        </Badge>
      )}
      <span className="sr-only">Ver carrinho de compras</span>
    </Button>
  );
}
