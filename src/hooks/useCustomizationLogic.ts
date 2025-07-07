"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import type { Product, OptionGroup, OptionItem } from "@/lib/types";

// State structure to hold selected options
// Key: groupId, Value: array of selected option IDs (for steppers) or a single ID (for radio)
type SelectedOptions = Record<string, string[]>;

interface UseCustomizationLogicProps {
  product: Product;
}

export function useCustomizationLogic({ product }: UseCustomizationLogicProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [observations, setObservations] = useState("");

  const allOptionsMap = useMemo(() => {
    const map = new Map<string, OptionItem>();
    product.optionGroups?.forEach(group => {
        group.options.forEach(option => {
            map.set(option.id, option);
        });
    });
    return map;
  }, [product]);

  // Initialize state when product changes
  useEffect(() => {
    const initialState: SelectedOptions = {};
    product.optionGroups?.forEach(group => {
      // Pre-select the first option for radio groups that are required
      if (group.controlType === 'radio' && group.min > 0 && group.options.length > 0) {
        initialState[group.id] = [group.options[0].id];
      } else {
        initialState[group.id] = [];
      }
    });
    setSelectedOptions(initialState);
    setObservations("");
  }, [product]);

  const handleOptionChange = useCallback((groupId: string, optionId: string, quantity: number) => {
    setSelectedOptions(prev => {
      const newSelections = { ...prev };
      const group = product.optionGroups?.find(g => g.id === groupId);
      if (!group) return prev;
      
      let currentGroupSelections = [...(newSelections[groupId] || [])];

      if (group.controlType === 'radio') {
        newSelections[groupId] = [optionId];
      } else { // Stepper
        // Remove all previous instances of this option
        currentGroupSelections = currentGroupSelections.filter(id => id !== optionId);
        // Add the option back 'quantity' times
        for (let i = 0; i < quantity; i++) {
          currentGroupSelections.push(optionId);
        }
        newSelections[groupId] = currentGroupSelections;
      }
      return newSelections;
    });
  }, [product.optionGroups]);

  const getOptionQuantity = useCallback((groupId: string, optionId: string) => {
      const groupSelections = selectedOptions[groupId] || [];
      return groupSelections.filter(id => id === optionId).length;
  }, [selectedOptions]);


  const finalPrice = useMemo(() => {
    let total = product.price;

    for (const groupId in selectedOptions) {
      const selectedIds = selectedOptions[groupId];
      for (const optionId of selectedIds) {
          const option = allOptionsMap.get(optionId);
          if (option) {
              total += option.price;
          }
      }
    }
    return total;
  }, [product.price, selectedOptions, allOptionsMap]);

  const getSelectionSummary = useCallback(() => {
    const summary: string[] = [];
    const mainFlavorGroup = product.optionGroups?.find(g => g.name === 'Sabores Salgados' || g.name === 'Sabores Doces');

    if (mainFlavorGroup) {
      const mainFlavorId = selectedOptions[mainFlavorGroup.id]?.[0];
      if (mainFlavorId) {
          const flavor = allOptionsMap.get(mainFlavorId);
          if (flavor) {
            summary.push(`Sabor: ${flavor.name}`);
          }
      }
    }

    product.optionGroups?.forEach(group => {
      if (group.id === mainFlavorGroup?.id) return; // Already handled

      const selectedIds = selectedOptions[group.id];
      if (!selectedIds || selectedIds.length === 0) return;

      const items: string[] = [];
      const counts: Record<string, number> = {};
      selectedIds.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });

      Object.entries(counts).forEach(([id, qty]) => {
          const option = allOptionsMap.get(id);
          if (option && option.price > 0) { // Only show items that have a cost or are explicit choices
              items.push(qty > 1 ? `${option.name} x${qty}` : option.name);
          } else if(option && group.controlType === 'radio' && group.min > 0) {
              items.push(option.name);
          }
      });
      
      if(items.length > 0) {
          summary.push(`${group.name}: ${items.join(', ')}`);
      }
    });

    return summary.join(' • ');
  }, [selectedOptions, product.optionGroups, allOptionsMap]);

  return {
    selectedOptions,
    handleOptionChange,
    getOptionQuantity,
    observations,
    setObservations,
    finalPrice,
    getSelectionSummary
  };
}
