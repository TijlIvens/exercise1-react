"use client";

import { Product } from "@/lib/types";
import { FC, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

export type ProductDetailCardProps = {
  product: Product;
};

export const ProductDetailCard: FC<ProductDetailCardProps> = ({ product }) => {
  const [cart, setCart] = useState<Record<string, number>>(getCart());

  useEffect(() => {
    localStorage.setItem("shoppyCart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: string, change: number) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + change);
      const updatedCart = { ...prev };

      if (newQty === 0) {
        delete updatedCart[id];
      } else {
        updatedCart[id] = newQty;
      }
      return updatedCart;
    });
  };

  const addToCart = (id: string) => updateQuantity(id, 1);
  const removeFromCart = (id: string) => updateQuantity(id, -1);
  const quantity = cart[product.id.toString()] || 0;

  return (
    <Card className="max-w-5xl mx-auto overflow-hidden p-0 flex flex-col shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[40%] shrink-0 flex flex-col bg-muted/20">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="md:w-[60%] p-6 md:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-col gap-4 mt-4 text-lg">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center gap-2 font-medium">
              <span>
                {product.amount} {product.unit}
              </span>
              <span className="text-muted-foreground">•</span>
              <span>{product.pricePerUnit}€</span>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeFromCart(product.id.toString())}
              >
                <i className="fa-solid fa-minus"></i>
              </Button>
              <span className="w-8 text-center font-bold text-xl">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => addToCart(product.id.toString())}
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
