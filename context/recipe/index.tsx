import { Dispatch, SetStateAction, createContext } from "react";
import { Recipe } from "@/validators/recipe";

export type RecipesContextValue = {
  recipes: Recipe[] | null;
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleCategoryClick: (category: string) => Promise<void>;
};

const RecipesContext = createContext<RecipesContextValue | null>(null);

export default RecipesContext;
