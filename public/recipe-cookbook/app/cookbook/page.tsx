"use client";

import { useState, useEffect } from "react";
import { FavoriteRecipe } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, HeartCrack } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CookbookPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("myCookbook");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  const removeFavorite = (idToRemove: string) => {
    const updated = favorites.filter((fav) => fav.id !== idToRemove);
    setFavorites(updated);
    localStorage.setItem("myCookbook", JSON.stringify(updated));
  };

  if (!mounted) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">My Cookbook</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Cookbook</h1>
        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium text-sm">
          {favorites.length} Saved Recipe{favorites.length !== 1 ? "s" : ""}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
          <HeartCrack className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-slate-700">
            Your cookbook is empty!
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            You haven't saved any recipes yet. Go back to search and find some
            delicious meals.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Find Recipes
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <Card
              key={recipe.id}
              className="flex flex-col overflow-hidden group p-0"
            >
              <Link
                href={`/recipe/${recipe.id}`}
                className="block overflow-hidden min-h-[12rem] relative"
              >
                <img
                  src={recipe.thumbnail}
                  alt={recipe.title}
                  className="w-full h-full absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <CardContent className="p-4 flex flex-col flex-grow justify-between gap-4">
                <Link
                  href={`/recipe/${recipe.id}`}
                  className="hover:text-orange-600 transition-colors"
                >
                  <h3 className="font-bold text-lg line-clamp-2 leading-tight">
                    {recipe.title}
                  </h3>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full text-slate-500 hover:text-red-600 hover:bg-red-50 mt-auto"
                  onClick={() => removeFavorite(recipe.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
