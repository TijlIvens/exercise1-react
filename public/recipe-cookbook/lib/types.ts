export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface MealDetail extends Meal {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strYoutube: string;
  // Ingredients and Measurements are dynamic
  [key: string]: string | null | undefined;
}

export interface FavoriteRecipe {
  id: string;
  title: string;
  thumbnail: string;
}
