import { z } from "zod";
import {
  Recipe,
  RecipePopulated,
  RecipePopulatedSchema,
} from "@/validators/recipe";
import { updateRecipeSchema } from "@/app/api/recipes/_validators/update-recipe-validator";

export const createRecipe = async ({
  ...recipe
}: Partial<Recipe>): Promise<RecipePopulated> => {
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

export const updateRecipe = async (
  recipeToUpdate: z.infer<typeof updateRecipeSchema> & { id: string },
): Promise<RecipePopulated | null> => {
  try {
    const url = `/api/recipes/${recipeToUpdate.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...recipeToUpdate }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();
    return RecipePopulatedSchema.parse(data);
  } catch (error) {
    console.error("Failed to update recipe:", error);
    throw error;
  }
};
