"use client";

import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface StepperProps {
  count: number;
  onChange: (c: number) => void;
  disabled?: boolean;
}

export function Stepper({
  count,
  onChange,
  disabled = false,
}: StepperProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        disabled={disabled || count === 0}
        className={cn(
          "h-7 w-7 rounded-full",
          disabled && "opacity-50"
        )}
        onClick={() => onChange(Math.max(0, count - 1))}
      >
        <Minus size={14} />
      </Button>
      <span className="w-6 text-center font-medium text-base text-gray-800 tabular-nums">{count}</span>
      <Button
        variant="outline"
        size="icon"
        disabled={disabled}
        className={cn(
          "h-7 w-7 rounded-full",
           disabled && "opacity-50"
        )}
        onClick={() => onChange(Math.min(10, count + 1))}
      >
        <Plus size={14} />
      </Button>
    </div>
  );
}
