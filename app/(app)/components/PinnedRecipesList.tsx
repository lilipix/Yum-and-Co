import { RecipePopulated } from "@/validators/recipe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecipeList from "./RecipeList";

type PinnedRecipesListProps = {
  pinnedRecipes: RecipePopulated[];
};

const PinnedRecipesList = ({ pinnedRecipes }: PinnedRecipesListProps) => {
  return (
    <div className="mx-auto w-full max-w-[1024px]">
      <Card>
        <CardHeader>
          <CardTitle>Recettes épinglées</CardTitle>
          <CardDescription>Visualisez les recettes épinglées.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecipeList initialRecipes={pinnedRecipes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PinnedRecipesList;
