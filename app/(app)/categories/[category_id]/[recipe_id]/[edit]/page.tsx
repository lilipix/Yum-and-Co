import connectToDatabase from "@/lib/mongodb";
import { findTags } from "@/database/tags/tag.repository";
import { Tag, TagsSchema } from "@/validators/tag";
import { findCategories } from "@/database/categories/category.repository";
import { CategoriesSchema, Category } from "@/validators/category";
import EditRecipe from "./component/EditRecipe";
import { findRecipeById } from "@/database/recipes/recipe.repository";
import RecipeProvider from "@/context/recipe/provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type EditRecipePageProps = {
  params: {
    recipe_id: string;
    category_id: string;
  };
};

const EditRecipePage = async ({ params }: EditRecipePageProps) => {
  const { recipe_id, category_id } = params;
  await connectToDatabase();

  const tags = await findTags();
  const parsedTags: Tag[] = TagsSchema.parse(tags);

  const categories = await findCategories();
  const parsedCategories: Category[] = CategoriesSchema.parse(categories);

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
            <BreadcrumbLink href={`/categories/${category_id}/`}>
              {recipe?.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${category_id}/${recipe_id}`}>
              {recipe?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Modifier la recette</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <RecipeProvider recipe={recipe}>
        <EditRecipe tags={parsedTags} categories={parsedCategories} />
      </RecipeProvider>
    </div>
  );
};

export default EditRecipePage;
