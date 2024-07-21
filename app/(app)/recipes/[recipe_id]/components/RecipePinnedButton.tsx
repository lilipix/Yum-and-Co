"use client";

import useTogglePin from "@/hooks/useTogglePin";
import { RecipePopulated } from "@/validators/recipe";
import { PinIcon, PinOff } from "lucide-react";

type RecipePinnedButtonProps = {
  initialRecipe: RecipePopulated | null;
};
const RecipePinnedButton = ({ initialRecipe }: RecipePinnedButtonProps) => {
  const { recipeList, handleTogglePin } = useTogglePin({ initialRecipe });

  if (!initialRecipe) {
    return null;
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleTogglePin(recipeList[0].id, recipeList[0].pinned);
      }}
      className="hover:bg-border-dark rounded-full bg-border p-2"
      aria-label={recipeList[0].pinned ? "Unpin Recipe" : "Pin Recipe"}
    >
      {recipeList[0].pinned ? <PinIcon size="16" /> : <PinOff size="16" />}
    </button>
  );
};

export default RecipePinnedButton;
