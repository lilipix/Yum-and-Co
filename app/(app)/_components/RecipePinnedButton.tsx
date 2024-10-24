"use client";

import useTogglePin from "@/hooks/useTogglePin";
import { RecipePopulated } from "@/validators/recipe";
import { PinIcon, PinOff } from "lucide-react";

type RecipePinnedButtonProps = {
  initialRecipe: RecipePopulated | null;
};
const RecipePinnedButton = ({ initialRecipe }: RecipePinnedButtonProps) => {
  const { handleTogglePin } = useTogglePin({
    initialPinnedRecipes: initialRecipe ? [initialRecipe] : [],
  });

  if (!initialRecipe) {
    return null;
  }

  // if (!recipe) {
  //   return null; // Si aucune recette n'est disponible, ne pas afficher le bouton
  // }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleTogglePin(initialRecipe.id, initialRecipe.pinned);
      }}
      className="rounded-full bg-border p-2 hover:bg-border-dark"
      aria-label={initialRecipe.pinned ? "Unpin Recipe" : "Pin Recipe"}
    >
      {initialRecipe.pinned ? <PinIcon size="16" /> : <PinOff size="16" />}
    </button>
  );
};

export default RecipePinnedButton;
