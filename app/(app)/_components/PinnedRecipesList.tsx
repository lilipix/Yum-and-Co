"use client";

import { RecipePopulated } from "@/validators/recipe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecipeList from "./RecipeList";
import useTogglePin from "@/hooks/useTogglePin";

type PinnedRecipesListProps = {
  pinnedRecipesFromServer: RecipePopulated[];
  latestRecipesFromServer: RecipePopulated[];
};

const PinnedRecipesList = ({
  pinnedRecipesFromServer,
  latestRecipesFromServer,
}: PinnedRecipesListProps) => {
  const { pinnedRecipes, handleTogglePin } = useTogglePin({
    initialPinnedRecipes: pinnedRecipesFromServer || null,
    initialLatestRecipes: latestRecipesFromServer || null,
  });

  return (
    <div className="mx-auto w-full max-w-[1024px]">
      <Card>
        <CardHeader>
          <CardTitle>Recettes épinglées</CardTitle>
          <CardDescription>Visualisez les recettes épinglées.</CardDescription>
        </CardHeader>
        <CardContent>
          {pinnedRecipes.length > 0 ? (
            <RecipeList
              recipes={pinnedRecipes || []}
              onTogglePin={handleTogglePin}
            />
          ) : (
            <p>Aucune recette épinglée.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PinnedRecipesList;
