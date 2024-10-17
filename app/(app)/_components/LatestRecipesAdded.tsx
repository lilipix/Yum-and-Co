import { RecipePopulated } from "@/validators/recipe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecipeList from "./RecipeList";

type LatestRecipesAddedProps = {
  latestRecipesAdded: RecipePopulated[];
};

const LatestRecipesAdded = ({
  latestRecipesAdded,
}: LatestRecipesAddedProps) => {
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
          <RecipeList initialRecipes={latestRecipesAdded} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestRecipesAdded;
