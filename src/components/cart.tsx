"use client";

import { useCart } from '@/context/cart-context';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { CartItem } from './cart-item';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export function Cart() {
  const { state } = useCart();
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Card className="bg-white text-card-foreground shadow-lg flex flex-col h-full max-h-[calc(100vh-8rem)] rounded-xl">
      <CardHeader className='pb-4'>
        <CardTitle className="text-xl font-bold text-primary">Meu Carrinho</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        {state.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500">
            <ShoppingCart className="h-12 w-12 mb-4 text-primary/40" />
            <p className='font-semibold text-lg'>Seu carrinho está vazio.</p>
            <p className="text-sm">Adicione itens do cardápio para começar.</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-2">
              <AnimatePresence>
                {state.items.map((item) => (
                    <motion.div key={item.id} layout>
                        <CartItem item={item} />
                        <Separator className='last:hidden' />
                    </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        )}
      </CardContent>
      {state.items.length > 0 && (
        <CardFooter className="flex-col items-stretch p-6 space-y-4 bg-gray-50/70 border-t">
          <div className="flex justify-between font-semibold text-gray-600">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4" size="lg">
            Finalizar Pedido
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
