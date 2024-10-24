import { z } from "zod";
import {
  Recipe,
  RecipePopulated,
  RecipePopulatedSchema,
} from "@/validators/recipe";
import { updateRecipeSchema } from "@/app/api/recipes/_validators/update-recipe-validator";

export const findRecipe = async (): Promise<RecipePopulated[]> => {
  try {
    const response = await fetch("/api/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch recipe");
    }
    return RecipePopulatedSchema.array().parse(data);
  } catch (error) {
    throw error;
  }
};

export const findRecipeById = async (
  recipe_id: string,
): Promise<RecipePopulated> => {
  try {
    const response = await fetch(`/api/recipes/${recipe_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch recipe");
    }
    console.log("SERVICE>>>", data);
    return RecipePopulatedSchema.parse(data);
  } catch (error) {
    console.error("Failed to fetch recipe by ID:", error);
    throw error;
  }
};

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

export const deleteRecipe = async (
  recipeId: string,
): Promise<RecipePopulated> => {
  try {
    console.log("service");
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete recipe");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const togglePin = async (
  recipeId: string,
  shouldPin: boolean,
): Promise<Recipe> => {
  try {
    const url = `/api/recipes/${recipeId}/toggle-pin`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shouldPin }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to toggle pin status:", error);
    throw error;
  }
};
