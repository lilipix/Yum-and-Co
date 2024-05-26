"use client";

import { useContext } from "react";
import RecipeContext, { RecipeContextValue } from ".";

const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe was used outside of its Provider");
  }
  return context as RecipeContextValue;
};

export default useRecipe;
