"use client";

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import RecipesContext from ".";

type RecipesProviderProps = {
  children: ReactNode;
  recipes?: IRecipe[];
};

const RecipesProvider = ({ children }: RecipesProviderProps) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = useCallback(
    async (category: string) => {
      setIsLoading(true);
      try {
        const fetchedRecipes = await getRecipesByCategory(category);
        console.log("fetchedRecipes", fetchedRecipes);

        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setRecipes]
  );

  const contextValue = useMemo(
    () => ({
      recipes,
      setRecipes,
      isLoading,
      setIsLoading,
      handleCategoryClick,
    }),
    [recipes, isLoading, handleCategoryClick]
  );
  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
