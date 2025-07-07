"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/context/cart-context';
import { Badge } from './ui/badge';
import { AnimatePresence, motion } from 'framer-motion';

export function CartIcon() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button size="icon" className="rounded-full h-16 w-16 shadow-lg relative bg-primary hover:bg-primary/90 text-primary-foreground">
        <ShoppingCart className="h-7 w-7" />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="absolute -top-1 -right-1"
            >
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold border-2 border-background"
              >
                {itemCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Ver carrinho de compras</span>
      </Button>
    </motion.div>
  );
}
