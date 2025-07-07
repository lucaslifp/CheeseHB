"use client";

import React from "react";
import { Product, OptionGroup } from "@/lib/types";
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
import { motion } from "framer-motion";
import { Stepper } from "@/components/ui/Stepper";
import { useCustomizationLogic } from "@/hooks/useCustomizationLogic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FastFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function FastFoodModal({
  isOpen,
  onClose,
  product,
}: FastFoodModalProps) {
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

  // Separate required (radio) from optional (stepper) groups
  const requiredGroups = product.optionGroups?.filter(g => g.controlType === 'radio' && g.min > 0) || [];
  const optionalGroups = product.optionGroups?.filter(g => g.controlType === 'stepper') || [];
  
  const canAddToCart = requiredGroups.every(group => selectedOptions[group.id]?.length >= group.min);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    
    const details = getSelectionSummary();
    const name = product.name;
    
    addItem({
      id: `${product.id}|${JSON.stringify(selectedOptions)}|${observations}`,
      productId: product.id,
      name: name,
      quantity: 1,
      image: product.image,
      price: finalPrice,
      details: details,
    });
    onClose();
  };
  
  const renderRadioGroup = (group: OptionGroup) => (
    <section key={group.id}>
      <h3 className="text-lg font-semibold mb-3 border-b pb-2">
        {group.name}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {group.options.map(option => (
          <motion.div
            key={option.id}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "border rounded-lg p-3 flex-col items-center justify-center text-sm font-medium flex cursor-pointer transition-all duration-200 h-20 text-center",
              selectedOptions[group.id]?.[0] === option.id
                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary"
                : "bg-background hover:bg-gray-100"
            )}
            onClick={() => handleOptionChange(group.id, option.id, 1)}
          >
            {option.name}
            {option.price > 0 && <span className="text-xs mt-1">(+{option.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })})</span>}
          </motion.div>
        ))}
      </div>
    </section>
  )
  
  const renderStepperGroup = (group: OptionGroup) => (
    <div className="space-y-3 pt-2">
      {group.options.map((option) => (
        <div key={option.id} className="flex justify-between items-center p-3 border rounded-lg">
          <span>{option.name}</span>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">+{option.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            <Stepper count={getOptionQuantity(group.id, option.id)} onChange={(c) => handleOptionChange(group.id, option.id, c)}/>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md w-full h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-center">
            Personalize os ingredientes do seu lanche.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 space-y-4 pt-4">
            {requiredGroups.map(renderRadioGroup)}
            
            {canAddToCart && (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
                <Accordion type="multiple" className="w-full" defaultValue={['item-1']}>
                  {optionalGroups.map((group, index) => (
                    <AccordionItem key={group.id} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold">{group.name}</AccordionTrigger>
                      <AccordionContent>{renderStepperGroup(group)}</AccordionContent>
                    </AccordionItem>
                  ))}
                   <AccordionItem value="obs">
                      <AccordionTrigger className="text-lg font-semibold">Observações</AccordionTrigger>
                      <AccordionContent>
                        <Textarea
                          placeholder="Ex: sem cebola, ponto da carne mal passado..."
                          value={observations}
                          onChange={(e) => setObservations(e.target.value)}
                          className="min-h-[80px] mt-2"
                        />
                      </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </motion.div>
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
              Adicionar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
