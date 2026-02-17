// "use client";

// import { togglePin } from "@/services/recipes.service";
// import { RecipePopulated } from "@/validators/recipe";
// import { useState } from "react";

// type useTogglePinProps = {
//   initialRecipes?: RecipePopulated[];
//   initialRecipe?: RecipePopulated | null;
// };
// const useTogglePin = ({ initialRecipes, initialRecipe }: useTogglePinProps) => {
//   const [recipeList, setRecipeList] = useState<RecipePopulated[]>(
//     initialRecipes ? initialRecipes : initialRecipe ? [initialRecipe] : [],
//   );

//   const handleTogglePin = async (
//     recipeId: string,
//     currentlyPinned: boolean,
//   ) => {
//     try {
//       await togglePin(recipeId, !currentlyPinned);

//       const updatedRecipes = recipeList.map((recipe) => {
//         if (recipe.id === recipeId) {
//           return { ...recipe, pinned: !recipe.pinned };
//         }
//         return recipe;
//       });
//       setRecipeList(updatedRecipes);
//     } catch (error) {
//       console.error("Failed to toggle pin:", error);
//     }
//   };
//   return { recipeList, handleTogglePin };
// };

// export default useTogglePin;
"use client";

import { findRecipeById, togglePin } from "@/services/recipes.service";
import { RecipePopulated } from "@/validators/recipe";
import { useEffect, useState } from "react";

type useTogglePinProps = {
  initialPinnedRecipes?: RecipePopulated[];
  initialLatestRecipes?: RecipePopulated[];
};

const useTogglePin = ({
  initialPinnedRecipes,
  initialLatestRecipes,
}: useTogglePinProps) => {
  const [pinnedRecipes, setPinnedRecipes] = useState<RecipePopulated[]>(
    initialPinnedRecipes || [],
  );
  const [latestRecipes, setLatestRecipes] = useState<RecipePopulated[]>(
    initialLatestRecipes || [],
  );
  const handleTogglePin = async (
    recipe_id: string,
    currentlyPinned: boolean,
  ) => {
    try {
      await togglePin(recipe_id, !currentlyPinned);

      if (currentlyPinned) {
        // Si la recette est épinglée et qu'on la désépingle, on la retire de la liste
        setPinnedRecipes((prevPinnedRecipes) =>
          prevPinnedRecipes.filter((recipe) => recipe.id !== recipe_id),
        );

        setLatestRecipes((prevLatestRecipes) =>
          prevLatestRecipes.map((recipe) =>
            recipe.id === recipe_id ? { ...recipe, pinned: false } : recipe,
          ),
        );
      } else {
        // Si elle n'est pas épinglée et qu'on l'épingle, on l'ajoute à la liste
        const recipeToPin = await findRecipeById(recipe_id);

        setPinnedRecipes((prevPinnedRecipes) => [
          ...prevPinnedRecipes,
          { ...recipeToPin, pinned: true },
        ]);

        // Ajouter à la liste des dernières recettes
        setLatestRecipes((prevLatestRecipes) =>
          prevLatestRecipes.map((recipe) =>
            recipe.id === recipe_id ? { ...recipe, pinned: true } : recipe,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  };
  return { pinnedRecipes, latestRecipes, handleTogglePin };
};

export default useTogglePin;
