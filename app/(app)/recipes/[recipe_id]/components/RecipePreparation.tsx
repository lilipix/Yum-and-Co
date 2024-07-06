import { RecipePopulated } from "@/validators/recipe";
import React from "react";

type RecipePreparationProps = {
  recipe: RecipePopulated | null;
};
const RecipePreparation = ({ recipe }: RecipePreparationProps) => {
  return <div>{recipe && recipe.preparation}</div>;
};

export default RecipePreparation;
