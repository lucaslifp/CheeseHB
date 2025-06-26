"use client";

import { useCart } from '@/context/cart-context';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { CartItem as CartItemType } from '@/lib/types';
import { CartItem } from './cart-item';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

export function Cart() {
  const { state } = useCart();

  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Card className="bg-card text-card-foreground shadow-lg lg:sticky lg:top-24 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="font-headline">Meu Carrinho</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        {state.items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6 text-muted-foreground">
            <p>Seu carrinho está vazio.</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      {state.items.length > 0 && (
          <CardFooter className="flex-col items-stretch p-6 space-y-4">
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 mt-4" size="lg">
              Finalizar Pedido
            </Button>
          </CardFooter>
      )}
    </Card>
  );
}
