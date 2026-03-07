"use client";

import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import products from "../../public/products.json";
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

export default function CartPage() {
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

  const handleClearCart = () => {
    setCart({});
  };

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = (
        products as { groceryProducts: Product[] }
      ).groceryProducts.find((p: Product) => p.id.toString() === id);
      return { product, quantity };
    })
    .filter((item) => item.product !== undefined) as {
    product: Product;
    quantity: number;
  }[];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header showBack={true} />
      <main className="container mx-auto px-4 py-8 max-w-2xl flex-grow flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-muted-foreground mt-12">
            Your cart is empty.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map(({ product, quantity }) => (
              <Card
                key={product.id}
                className="flex flex-row items-center justify-between p-4 bg-gray-200 border-none rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative flex items-center justify-center  overflow-hidden shrink-0">
                    <img
                      src={`/images/${product.image}`}
                      alt={product.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-black font-sans">
                    {product.name}
                  </h2>
                </div>
                <div className="flex items-center gap-4 mr-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 bg-white border-none shadow-sm text-black hover:bg-gray-100"
                    onClick={() => updateQuantity(product.id.toString(), -1)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </Button>
                  <span className="text-xl font-medium w-4 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-10 h-10 bg-white border-none shadow-sm text-black hover:bg-gray-100"
                    onClick={() => updateQuantity(product.id.toString(), 1)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <Card className="flex flex-row items-center justify-between p-4 bg-gray-200 border-none rounded-2xl shadow-sm mt-4">
            <Button
              onClick={handleClearCart}
              className="bg-gradient-to-r from-pink-600 to-red-500 hover:opacity-90 transition-opacity text-white rounded-full px-8 py-6 text-lg font-medium border-none"
            >
              Clear
            </Button>
            <div className="text-2xl font-bold pr-4">
              Total: €{totalPrice.toFixed(2)}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
