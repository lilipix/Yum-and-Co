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

type LatestRecipesAddedProps = {
  latestRecipesFromServer: RecipePopulated[];
  pinnedRecipesFromServer: RecipePopulated[];
};

const LatestRecipesAdded = ({
  latestRecipesFromServer,
  pinnedRecipesFromServer,
}: LatestRecipesAddedProps) => {
  const { latestRecipes, handleTogglePin } = useTogglePin({
    initialLatestRecipes: latestRecipesFromServer || [],
    initialPinnedRecipes: pinnedRecipesFromServer || [],
  });
  console.log(latestRecipes);
  return (
    <div className="mx-auto w-full max-w-[1024px]">
      <Card>
        <CardHeader>
          <CardTitle>Dernières recettes ajoutées</CardTitle>
          <CardDescription>
            Visualisez les dernières recettes ajoutées.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecipeList
            recipes={latestRecipes || []}
            onTogglePin={handleTogglePin}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestRecipesAdded;
