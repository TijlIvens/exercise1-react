"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MealDetail, FavoriteRecipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<MealDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error("Failed to fetch recipe", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      const saved = localStorage.getItem("myCookbook");
      if (saved) {
        const favorites: FavoriteRecipe[] = JSON.parse(saved);
        setIsFavorite(favorites.some((fav) => fav.id === recipe.idMeal));
      }
    }
  }, [recipe]);

  const toggleFavorite = () => {
    if (!recipe) return;

    const saved = localStorage.getItem("myCookbook");
    let favorites: FavoriteRecipe[] = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== recipe.idMeal);
    } else {
      favorites.push({
        id: recipe.idMeal,
        title: recipe.strMeal,
        thumbnail: recipe.strMealThumb,
      });
    }

    localStorage.setItem("myCookbook", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-10 w-32 mb-8" />
        <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-12 w-32" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-10" />
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe not found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </main>
    );
  }

  const ingredients = getIngredients();
  const instructions = recipe.strInstructions
    .split("\n")
    .filter((step) => step.trim() !== "");

  return (
    <div className="container mx-auto max-w-4xl">
      <Button className="my-4" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      <main className="container mx-auto px-4 py-4 max-w-4xl bg-white rounded-xl shadow-sm border mb-8">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="w-full md:w-1/2">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-auto rounded-2xl shadow-md object-cover aspect-square"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col  align-start space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                {recipe.strCategory}
              </Badge>
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                {recipe.strArea}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              {recipe.strMeal}
            </h1>

            <Button
              variant={isFavorite ? "secondary" : "default"}
              onClick={toggleFavorite}
              className={`w-full sm:w-auto ${isFavorite ? "" : "bg-orange-600 hover:bg-orange-700"}`}
            >
              <Heart
                className={`w-5 h-5 mr-3 ${isFavorite ? "fill-orange-500 text-orange-500" : ""}`}
              />
              {isFavorite ? "Saved to Cookbook" : "Save to Cookbook"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1 border-t md:border-t-0 md:border-r border-slate-200 pt-8 md:pt-0 pr-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b border-slate-100 pb-2 last:border-0 text-slate-700"
                >
                  <span className="font-medium text-slate-900">
                    {item.ingredient}
                  </span>
                  <span className="text-slate-500 text-right">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 border-t md:border-t-0 border-slate-200 pt-8 md:pt-0">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Instructions
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
              {instructions.map((step, index) => (
                <p key={index} className="flex gap-4">
                  <span className="font-bold text-orange-400 shrink-0">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </p>
              ))}
            </div>

            {recipe.strYoutube && (
              <div className="mt-10 pt-6 border-t border-slate-100">
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-600 font-semibold hover:underline flex items-center"
                >
                  Watch Video Tutorial on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
