"use client";

import { useState, useEffect, FC, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { Product } from "../../lib/types";

const getCart = () => {
  try {
    const stored = localStorage.getItem("shoppyCart");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse cart", e);
  }
  return {};
};

export type PageContentProps = {
  products: Product[];
};

export const PageContent: FC<PageContentProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>(getCart());

  useEffect(() => {
    localStorage.setItem("shoppyCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: string) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const newCart = { ...prev, [id]: currentQty + 1 };

      return newCart;
    });
  };

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
  };

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory)
      return false;
    if (
      appliedSearch &&
      !p.name.toLowerCase().includes(appliedSearch.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <ProductFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            productAmount={product.amount}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </main>
  );
};
