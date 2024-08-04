import { findRecipeById } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ColorPalette } from "@/validators/tag";
import RecipeProvider from "@/context/recipe/provider";
import RecipePinnedButton from "@/app/(app)/_components/RecipePinnedButton";
import RecipeEditButton from "@/app/(app)/recipes/[recipe_id]/components/RecipeEditButton";
import RecipeDeleteButton from "@/app/(app)/recipes/[recipe_id]/components/RecipeDeleteButton";
import GeneralRecipeInformation from "@/app/(app)/recipes/[recipe_id]/components/GeneralRecipeInformation";
import IngredientsList from "@/app/(app)/recipes/[recipe_id]/components/IngredientsList";
import RecipePreparation from "@/app/(app)/recipes/[recipe_id]/components/RecipePreparation";

type RecipePageByTagProps = {
  params: {
    recipe_id: string;
    tags_id: string[];
  };
};
const RecipePageByTag = async ({ params }: RecipePageByTagProps) => {
  const { recipe_id, tags_id } = params;

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
            {recipe?.tags.map((tag, index) => (
              <span key={tag.id}>
                <BreadcrumbLink href={`/tags/${tag.id}/`}>
                  {tag.name}
                </BreadcrumbLink>
                {index < recipe.tags.length - 1 && " - "}
              </span>
            ))}
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
                <RecipeDeleteButton />
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
      </RecipeProvider>
    </div>
  );
};

export default RecipePageByTag;
