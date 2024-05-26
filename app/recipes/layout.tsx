import RecipeProvider from "@/context/recipe/provider";
import { ReactNode } from "react";

type NewRecipeLayoutProps = {
  children: ReactNode;
};

const NewRecipeLayout = async ({ children }: NewRecipeLayoutProps) => {
  return <RecipeProvider>{children}</RecipeProvider>;
};

export default NewRecipeLayout;
