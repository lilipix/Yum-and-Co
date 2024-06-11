"use client";

import { createContext } from "react";
import { RecipePopulated } from "@/validators/recipe";
import { CreateRecipeSchema } from "@/app/api/recipes/_validators/create-recipe.validator";
import { z } from "zod";

export type RecipeContextValue = {
  recipe: RecipePopulated | null;
  isLoading: boolean;
  isMutating: boolean;
  error: Error | null;
  createRecipe: (
    recipe: z.infer<typeof CreateRecipeSchema>,
  ) => Promise<RecipePopulated | null>;
};

const RecipeContext = createContext<RecipeContextValue | null>(null);

export default RecipeContext;
