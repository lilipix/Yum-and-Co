import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findRecipeById } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import React from "react";
import GeneralRecipeInformation from "./components/GeneralRecipeInformation";
import IngredientsList from "./components/IngredientsList";
import RecipePreparation from "./components/RecipePreparation";
import { Badge } from "@/components/ui/badge";
import { ColorPalette } from "@/validators/tag";
import { Edit } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import RecipeProvider from "@/context/recipe/provider";
import RecipeEditButton from "./components/RecipeEditButton";
import DeleteRecipe from "./components/RecipeDeleteButton";
import RecipePinnedButton from "./components/RecipePinnedButton";
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
    <RecipeProvider recipe={recipe}>
      <div className="mx-auto flex w-full max-w-[768px] flex-col gap-4 p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle className="flex items-center justify-start gap-4">
                  <span>{recipe?.title} </span>
                  <RecipePinnedButton initialRecipe={recipe} />
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  {recipe?.tags.map((tag) => (
                    <div key={tag.id}>
                      <Badge variant={tag.color || ColorPalette.SECONDARY}>
                        {tag.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <RecipeEditButton recipe_id={recipe_id} />
                <DeleteRecipe />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GeneralRecipeInformation />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingrédients</CardTitle>
          </CardHeader>
          <CardContent>
            <IngredientsList />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Préparation</CardTitle>
          </CardHeader>
          <CardContent>
            <RecipePreparation />
          </CardContent>
        </Card>
      </div>
    </RecipeProvider>
  );
};

export default RecipePage;
