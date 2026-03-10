"use client";

import { useState } from "react";
import { Meal } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMeals = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`,
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Failed to fetch meals", error);
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow flex flex-col items-center">
      <div className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-orange-900">
          Find Your Next Meal
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          Search for recipes by their main ingredient.
        </p>

        <form onSubmit={searchMeals} className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="e.g. Chicken, Beef, Egg..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-lg py-6"
          />
          <Button
            type="submit"
            size="lg"
            className="px-8 bg-orange-600 hover:bg-orange-700 py-6"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </form>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="flex flex-col overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : !searched ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-orange-50/50 rounded-2xl border border-orange-100 shadow-sm">
            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              What are you craving?
            </h2>
            <p className="text-slate-500 max-w-md">
              Enter a main ingredient above (like Chicken, Beef, Pork, or Pasta)
              to discover delicious recipes to add to your cookbook.
            </p>
          </div>
        ) : searched && meals.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-lg border-2 border-dashed border-slate-300 rounded-xl">
            No recipes found for "{searchTerm}". Try another ingredient like
            "Pork" or "Salmon".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <Link
                href={`/recipe/${meal.idMeal}`}
                key={meal.idMeal}
                className="group flex h-full"
              >
                <Card className="flex flex-col overflow-hidden w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-0">
                  <div className="overflow-hidden h-48 w-full">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors pb-2">
                      {meal.strMeal}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
