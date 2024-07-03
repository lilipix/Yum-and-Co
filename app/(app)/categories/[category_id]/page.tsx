import { Card, CardHeader } from "@/components/ui/card";
import { findCategoryById } from "@/database/categories/category.repository";
import { findRecipesByCategories } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import CategoryProvider from "@/context/category/provider";
import EditCategory from "./components/EditCategory";
import RecipeList from "../../_components/RecipeList";
import CategoryHeader from "./components/CategoryHeader";
import DeleteCategory from "./components/DeleteCategory";

type PageCategoryProps = {
  params: {
    category_id: string;
  };
};

const PageCategory = async ({ params }: PageCategoryProps) => {
  const { category_id } = params;

  await connectToDatabase();

  const category = await findCategoryById(category_id);

  const recipes = await findRecipesByCategories(category_id);

  return (
    <CategoryProvider category={category}>
      <div className="mx-auto flex w-full max-w-[1024px] flex-col p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CategoryHeader />
              <div className="flex gap-2">
                <EditCategory />
                <DeleteCategory />
              </div>
            </div>
          </CardHeader>
          <RecipeList recipes={recipes} />
        </Card>
      </div>
    </CategoryProvider>
  );
};

export default PageCategory;
