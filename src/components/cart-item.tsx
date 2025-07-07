"use client";

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types';
import { Button } from './ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="flex items-start space-x-4 py-3"
    >
      <div className="relative h-20 w-20 rounded-lg overflow-hidden shadow-sm">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1 flex flex-col h-20">
        <p className="font-semibold text-gray-800">{item.name}</p>
        <p className="text-xs text-gray-500 flex-1">{item.details}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: item.id } })}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: item.id } })}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-base font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-destructive hover:bg-destructive/10 shrink-0" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
