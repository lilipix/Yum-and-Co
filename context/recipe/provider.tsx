"use client";
import { RecipePopulated } from "@/validators/recipe";
import { ReactNode, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import {
  createRecipe as createRecipeRequest,
  updateRecipe as updateRecipeRequest,
} from "@/services/recipes.service";
import RecipeContext, { RecipeContextValue } from ".";
import { CreateRecipeSchema } from "@/app/api/recipes/_validators/create-recipe.validator";
import { updateRecipeSchema } from "@/app/api/recipes/_validators/update-recipe-validator";
import { z } from "zod";

type RecipeProviderProps = {
  children: ReactNode;
  recipe?: RecipePopulated | null;
};

const RecipeProvider = ({
  children,
  recipe: initialCategory,
}: RecipeProviderProps) => {
  const [isMutating, setIsMutating] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<RecipePopulated | null>(
    "/api/recipes",
    { fallbackData: initialCategory },
  );

  const createRecipe = useCallback(
    async (
      recipe: z.infer<typeof CreateRecipeSchema>,
    ): Promise<RecipePopulated> => {
      setIsMutating(true);
      try {
        const createdCustomer = await createRecipeRequest(recipe);
        mutate(createdCustomer);
        return createdCustomer;
      } catch (error) {
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    [mutate],
  );

  const updateRecipe = useCallback(
    async (
      recipe: z.infer<typeof updateRecipeSchema> & { id: string },
    ): Promise<RecipePopulated | null> => {
      try {
        if (!data) {
          throw new Error(
            "Aucune donnée disponible pour mettre à jour la recette.",
          );
        }
        setIsMutating(true);
        const updatedRecipe = await updateRecipeRequest({
          ...recipe,
        });
        await mutate(updatedRecipe);
        return updatedRecipe;
      } catch (error) {
        console.error("Failed to update recipe:", error);
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contextValue: RecipeContextValue = useMemo(
    () => ({
      recipe: data ?? null,
      createRecipe,
      updateRecipe,
      isMutating,
      error,
      isLoading,
    }),
    [createRecipe, updateRecipe, data, isMutating, error, isLoading],
  );

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
