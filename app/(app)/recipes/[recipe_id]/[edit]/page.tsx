import connectToDatabase from "@/lib/mongodb";
import { findTags } from "@/database/tags/tag.repository";
import { Tag, TagsSchema } from "@/validators/tag";
import { findCategories } from "@/database/categories/category.repository";
import { CategoriesSchema, Category } from "@/validators/category";
import EditRecipe from "./component/EditRecipe";
import { findRecipeById } from "@/database/recipes/recipe.repository";
import RecipeProvider from "@/context/recipe/provider";

type EditRecipePageProps = {
  params: {
    recipe_id: string;
  };
};

const EditRecipePage = async ({ params }: EditRecipePageProps) => {
  const { recipe_id } = params;
  await connectToDatabase();

  const tags = await findTags();
  const parsedTags: Tag[] = TagsSchema.parse(tags);

  const categories = await findCategories();
  const parsedCategories: Category[] = CategoriesSchema.parse(categories);

  const recipe = await findRecipeById(recipe_id);

  return (
    <RecipeProvider recipe={recipe}>
      <div className="mx-auto flex w-full max-w-[768px] flex-col gap-4 p-6">
        <EditRecipe tags={parsedTags} categories={parsedCategories} />
      </div>
    </RecipeProvider>
  );
};

export default EditRecipePage;
