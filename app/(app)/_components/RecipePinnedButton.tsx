"use client";

import useTogglePin from "@/hooks/useTogglePin";
import { RecipePopulated } from "@/validators/recipe";
import { PinIcon, PinOff } from "lucide-react";

type RecipePinnedButtonProps = {
  initialRecipe: RecipePopulated | null;
  recipePage?: boolean;
};
const RecipePinnedButton = ({
  initialRecipe,
  recipePage,
}: RecipePinnedButtonProps) => {
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
      className={`rounded-full p-2 ${recipePage ? "" : "hover:bg-border-dark"}`}
      aria-label={recipeList[0].pinned ? "Unpin Recipe" : "Pin Recipe"}
    >
      {recipeList[0].pinned ? <PinIcon /> : <PinOff />}
    </button>
  );
};

export default RecipePinnedButton;
