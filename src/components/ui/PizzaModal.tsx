"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./dialog";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { ScrollArea } from "./scroll-area";
import { Stepper } from "./Stepper";
import { useCustomizationLogic } from "@/hooks/useCustomizationLogic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function PizzaModal({ isOpen, onClose, product }: PizzaModalProps) {
  const { addItem } = useCart();
  const { 
    selectedOptions,
    handleOptionChange,
    getOptionQuantity,
    observations,
    setObservations,
    finalPrice,
    getSelectionSummary
  } = useCustomizationLogic({ product });

  const [activeTab, setActiveTab] = useState("Salgados");

  const flavorGroups = useMemo(() => ({
    "Salgados": product.optionGroups?.find(g => g.name.includes("Salgados")),
    "Doces": product.optionGroups?.find(g => g.name.includes("Doces")),
  }), [product.optionGroups]);

  const otherGroups = useMemo(() => 
    product.optionGroups?.filter(g => !g.name.includes("Sabor")) || [],
    [product.optionGroups]
  );
  
  const currentFlavorGroupId = flavorGroups[activeTab as keyof typeof flavorGroups]?.id;
  const selectedFlavorId = currentFlavorGroupId ? selectedOptions[currentFlavorGroupId]?.[0] : undefined;

  const canAddToCart = !!selectedFlavorId;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    
    const flavorName = flavorGroups[activeTab as keyof typeof flavorGroups]?.options.find(f => f.id === selectedFlavorId)?.name || "";
    const details = getSelectionSummary();

    addItem({
      id: `${product.id}|${JSON.stringify(selectedOptions)}|${observations}`,
      productId: product.id,
      name: `${product.name} (${flavorName})`,
      quantity: 1,
      image: product.image,
      price: finalPrice,
      details,
    });
    onClose();
  };
  
  const renderGroup = (group: import("/src/lib/types").OptionGroup) => {
    if (group.controlType === 'stepper') {
      return (
        <div className="space-y-3 pt-2">
          {group.options.map((option) => (
            <div key={option.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <span className="font-medium">{option.name}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  +{option.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
              <Stepper 
                count={getOptionQuantity(group.id, option.id)} 
                onChange={(c) => handleOptionChange(group.id, option.id, c)}
              />
            </div>
          ))}
        </div>
      );
    }
    if (group.controlType === 'radio') {
       return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {group.options.map((option) => (
              <div 
                key={option.id} 
                className={cn(
                  "border rounded-lg p-3 flex flex-col justify-center items-center text-center cursor-pointer", 
                   selectedOptions[group.id]?.[0] === option.id && "bg-primary/10 ring-2 ring-primary"
                )} 
                onClick={() => handleOptionChange(group.id, option.id, 1)}
              >
                <span className="font-medium">{option.name}</span>
                {option.price > 0 && (
                   <span className="text-sm font-semibold mt-1">
                      +{option.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                   </span>
                )}
              </div>
            ))}
          </div>
       );
    }
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription>Escolha o sabor e personalize sua pizza.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
         <div className="px-6 space-y-4 pt-4">
            <section>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Salgados" disabled={!flavorGroups.Salgados}>Salgados</TabsTrigger>
                  <TabsTrigger value="Doces" disabled={!flavorGroups.Doces}>Doces</TabsTrigger>
                </TabsList>
                 <TabsContent value={activeTab} className="mt-4">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                       {flavorGroups[activeTab as keyof typeof flavorGroups]?.options.map((flavor) => (
                         <motion.div
                           key={flavor.id}
                           whileTap={{ scale: 0.95 }}
                           className={cn("border rounded-lg p-2 flex flex-col items-center justify-center text-center text-sm cursor-pointer transition-all h-24", selectedFlavorId === flavor.id ? "bg-primary/10 ring-2 ring-primary" : "bg-gray-50 hover:bg-gray-100")}
                           onClick={() => currentFlavorGroupId && handleOptionChange(currentFlavorGroupId, flavor.id, 1)}
                         >
                           <span className="font-medium">{flavor.name}</span>
                            {flavor.price > 0 && <span className="text-xs text-muted-foreground mt-1">+{flavor.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>}
                         </motion.div>
                       ))}
                     </div>
                 </TabsContent>
              </Tabs>
            </section>
            
            {canAddToCart && (
               <Accordion type="multiple" className="w-full space-y-4" defaultValue={['Borda']}>
                  {otherGroups.map(group => (
                     <AccordionItem key={group.id} value={group.name}>
                       <AccordionTrigger className="text-lg font-semibold">{group.name}</AccordionTrigger>
                       <AccordionContent>{renderGroup(group)}</AccordionContent>
                     </AccordionItem>
                  ))}
                   <AccordionItem value="obs">
                    <AccordionTrigger className="text-lg font-semibold">Observações</AccordionTrigger>
                    <AccordionContent>
                      <Textarea
                        placeholder="Ex: sem cebola, massa bem assada..."
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        className="mt-2"
                      />
                    </AccordionContent>
                  </AccordionItem>
               </Accordion>
            )}
            
          <div className="h-6" />
        </div>
        </ScrollArea>

        <DialogFooter className="p-6 border-t bg-background sticky bottom-0">
          <div className="w-full flex justify-between items-center">
             <div className="text-2xl font-bold text-primary">
              <span className="text-sm font-medium text-gray-500 block">Total</span>
              {finalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <Button disabled={!canAddToCart} onClick={handleAddToCart} className="bg-primary hover:bg-primary/90 px-8 py-4 text-base">
              Adicionar ao Carrinho
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
