import { Card, CardHeader } from "@/components/ui/card";
import { findCategoryById } from "@/database/categories/category.repository";
import { findRecipesByCategories } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import CategoryProvider from "@/context/category/provider";
import EditCategory from "./components/EditCategory";
import RecipeList from "../../_components/RecipeList";
import CategoryHeader from "./components/CategoryHeader";
import DeleteCategory from "./components/DeleteCategory";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    <div className="mx-auto flex w-full max-w-[1024px] flex-col space-y-6 p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CategoryProvider category={category}>
        <div>
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
            <RecipeList recipes={recipes} categoryId={category_id} />
          </Card>
        </div>
      </CategoryProvider>
    </div>
  );
};

export default PageCategory;
