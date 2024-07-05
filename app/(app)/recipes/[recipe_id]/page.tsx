import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findRecipeById } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import React from "react";
import GeneralRecipeInformation from "./components/GeneralRecipeInformation";
import IngredientsList from "./components/IngredientsList";
import RecipePreparation from "./components/RecipePreparation";
type RecipePageProps = {
  params: {
    recipe_id: string;
  };
};
const RecipePage = async ({ params }: RecipePageProps) => {
  const { recipe_id } = params;
  await connectToDatabase();

  const recipe = await findRecipeById(recipe_id);
  return (
    <div className="mx-auto flex w-full max-w-[768px] flex-col gap-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>{recipe?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <GeneralRecipeInformation recipe={recipe} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ingrédients</CardTitle>
        </CardHeader>
        <CardContent>
          <IngredientsList recipe={recipe} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Préparation</CardTitle>
        </CardHeader>
        <CardContent>
          <RecipePreparation recipe={recipe} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipePage;
