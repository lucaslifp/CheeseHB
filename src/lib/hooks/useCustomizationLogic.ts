import { useState, useMemo, useEffect } from "react";
import { Product } from "@/lib/types";
import { products as allProducts } from "@/lib/data";

export interface FastFoodAdditional {
  id: string;
  name: string;
  price: number;
}

interface UseCustomizationLogicProps {
  product: Product;
  additionalItems?: FastFoodAdditional[];
  pricePerAdditional?: number;
}

const drinks = allProducts.filter((p) => p.category === "Bebidas");
const desserts = allProducts.filter((p) => p.category === "Sobremesas");

export function useCustomizationLogic({
  product,
  additionalItems = [],
  pricePerAdditional = 0,
}: UseCustomizationLogicProps) {
  const [quantExtras, setQuantExtras] = useState<Record<string, number>>({});
  const [quantDrinks, setQuantDrinks] = useState<Record<string, number>>({});
  const [quantDesserts, setQuantDesserts] = useState<Record<string, number>>({});
  const [observations, setObservations] = useState("");

  useEffect(() => {
    setQuantExtras({});
    setQuantDrinks({});
    setQuantDesserts({});
    setObservations("");
  }, [product]);

  const calculateTotalPrice = useMemo(() => {
    let total = product.price;

    total += additionalItems.reduce(
      (sum, item) => sum + (quantExtras[item.id] || 0) * pricePerAdditional,
      0,
    );

    total += drinks.reduce(
      (sum, d) => sum + (quantDrinks[d.id] || 0) * d.price,
      0,
    );

    total += desserts.reduce(
      (sum, ds) => sum + (quantDesserts[ds.id] || 0) * ds.price,
      0,
    );

    return total;
  }, [
    product,
    quantExtras,
    quantDrinks,
    quantDesserts,
    additionalItems,
    pricePerAdditional,
  ]);

  return {
    quantExtras,
    setQuantExtras,
    quantDrinks,
    setQuantDrinks,
    quantDesserts,
    setQuantDesserts,
    observations,
    setObservations,
    finalPrice: calculateTotalPrice,
    drinks,
    desserts,
  };
}