"use client";

import RecipeList from "@/app/(app)/_components/RecipeList";
import useTags from "@/context/tags/useTags";
import { Recipe, RecipePopulated } from "@/validators/recipe";
import { useEffect, useState } from "react";

type RecipesListContainerProps = {
  initialRecipes: RecipePopulated[];
};

const RecipesListContainer = ({
  initialRecipes,
}: RecipesListContainerProps) => {
  const { tags } = useTags();
  const [recipes, setRecipes] = useState(initialRecipes);

  useEffect(() => {
    if (tags) {
      const updatedRecipes = recipes.map((recipe) => ({
        ...recipe,
        tags: recipe.tags.map(
          (tag) => tags.find((t) => t.id === tag.id) || tag,
        ),
      }));
      setRecipes(updatedRecipes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipesListContainer;
