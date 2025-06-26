"use client";

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/types';
import { Button } from './ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  return (
    <div className="flex items-start space-x-4 py-2">
      <div className="relative h-16 w-16 rounded-md overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.details}</p>
        <p className="text-sm font-bold mt-1">{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
      <div className="flex flex-col items-end space-y-2">
         <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: item.id } })}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: item.id } })}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } })}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
