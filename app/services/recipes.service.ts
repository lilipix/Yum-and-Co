import { z } from "zod";
import { CreateRecipeSchema } from "../api/recipes/_validators/create-recipe.validator";
import { RecipePopulated, RecipePopulatedSchema } from "@/validators/recipe";

export const createRecipe = async ({
  ...recipe
}: z.infer<typeof CreateRecipeSchema>): Promise<RecipePopulated> => {
  try {
    console.log(recipe);
    const data = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...recipe }),
    });

    if (data.ok) {
      return RecipePopulatedSchema.parse(data);
    }

    throw new Error("Failed to create recipe");
  } catch (error) {
    throw error;
  }
};
