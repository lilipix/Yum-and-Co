"use client";

import { togglePin } from "@/services/recipes.service";
import { RecipePopulated } from "@/validators/recipe";
import { useState } from "react";

type useTogglePinProps = {
  initialRecipes?: RecipePopulated[];
  initialRecipe?: RecipePopulated | null;
};
const useTogglePin = ({ initialRecipes, initialRecipe }: useTogglePinProps) => {
  const [recipeList, setRecipeList] = useState<RecipePopulated[]>(
    initialRecipes ? initialRecipes : initialRecipe ? [initialRecipe] : [],
  );

  const handleTogglePin = async (
    recipeId: string,
    currentlyPinned: boolean,
  ) => {
    try {
      await togglePin(recipeId, !currentlyPinned);

      const updatedRecipes = recipeList.map((recipe) => {
        if (recipe.id === recipeId) {
          return { ...recipe, pinned: !recipe.pinned };
        }
        return recipe;
      });
      setRecipeList(updatedRecipes);
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  };
  return { recipeList, handleTogglePin };
};

export default useTogglePin;
