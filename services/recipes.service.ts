import { z } from "zod";
import { RecipePopulated, RecipePopulatedSchema } from "@/validators/recipe";
import { CreateRecipeSchema } from '@/app/api/recipes/_validators/create-recipe.validator';

export const createRecipe = async ({
  ...recipe
}: z.infer<typeof CreateRecipeSchema>): Promise<RecipePopulated> => {
  try {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...recipe }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === "Recipe with this title already exists") {
        throw new Error("DuplicateTitleError");
      } else {
        throw new Error("Failed to create recipe");
      }
    }
    return RecipePopulatedSchema.parse(data);
  } catch (error) {
    throw error;
  }
};
