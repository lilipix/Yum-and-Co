import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { findRecipeById } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import React from "react";
import GeneralRecipeInformation from "./components/GeneralRecipeInformation";
import IngredientsList from "./components/IngredientsList";
import RecipePreparation from "./components/RecipePreparation";
import { Badge } from "@/components/ui/badge";
import { ColorPalette } from "@/validators/tag";
import RecipeProvider from "@/context/recipe/provider";
import RecipeEditButton from "./components/RecipeEditButton";
import DeleteRecipe from "./components/RecipeDeleteButton";
import RecipePinnedButton from "../../_components/RecipePinnedButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{recipe?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RecipeProvider recipe={recipe}>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle className="flex items-center justify-start gap-4">
                  <span>{recipe?.title} </span>
                  <div className="sm:hidden">
                    <RecipePinnedButton initialRecipe={recipe} />
                  </div>
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
                {/* <div className="hidden sm:inline-block">
                  <RecipePinnedButton initialRecipe={recipe} />
                </div> */}
                <RecipeEditButton recipe_id={recipe_id} />
                <DeleteRecipe />
              </div>
            </div>
          </CardHeader>
          {recipe?.picture ? (
            <CardContent className="relative mb-6 h-[300px] w-full">
              <Image
                src={recipe?.picture}
                fill={true}
                style={{ objectFit: "cover" }}
                sizes="100vw"
                alt="Picture of the recipe"
              />
            </CardContent>
          ) : (
            ""
          )}

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
      </RecipeProvider>
    </div>
  );
};

export default RecipePage;
