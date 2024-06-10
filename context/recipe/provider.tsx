"use client";
import { fetcher } from "@/lib/utils/fetcher.utils";
import {
  RecipePopulated,
} from "@/validators/recipe";
import { ReactNode, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { createRecipe as createRecipeRequest } from "@/services/recipes.service";
import RecipeContext, { RecipeContextValue } from ".";
import { CreateRecipeSchema } from "@/app/api/recipes/_validators/create-recipe.validator";
import { z } from "zod";

type RecipeProviderProps = {
  children: ReactNode;
  recipe?: RecipePopulated | null;
};

const RecipeProvider = ({ children }: RecipeProviderProps) => {
  const [isMutating, setIsMutating] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<RecipePopulated | null>(
    "/api/recipes",
    fetcher,
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

  const contextValue: RecipeContextValue = useMemo(
    () => ({
      recipe: data ?? null,
      createRecipe,
      isMutating,
      error,
      isLoading,
    }),
    [createRecipe, data, isMutating, error, isLoading],
  );

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
