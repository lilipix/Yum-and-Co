"use client";

import { useContext } from "react";
import RecipesContext, { RecipesContextValue } from ".";

const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes was used outside of its Provider");
  }
  return context as RecipesContextValue;
};

export default useRecipes;
