"use client";

import { Pizza, Search, X } from "lucide-react";
import { motion } from 'framer-motion';

export function Header({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
          >
            <Pizza className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-foreground">
            CheesePizza
          </h1>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/70" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar no cardápio..."
            className="rounded-full pl-10 pr-10 py-2 w-full text-sm bg-white/20 text-primary-foreground placeholder:text-primary-foreground/70 border-transparent focus:bg-white/30 focus:border-primary focus:ring-primary transition-all duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground"
              aria-label="Limpar busca"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
