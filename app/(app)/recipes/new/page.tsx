import { Plus } from "lucide-react";
import NewEmptyRecipeForm from "./components/NewEmptyRecipeForm";
import connectToDatabase from "@/lib/mongodb";
import { findCategories } from "@/database/categories/category.repository";
import { CategoriesSchema, Category } from "@/validators/category";
import { findRecipeByTitle } from "@/database/recipes/recipe.repository";
import { Tag, TagsSchema } from "@/validators/tag";
import { findTags } from "@/database/tags/tag.repository";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const NewRecipePage = async () => {
  await connectToDatabase();

  const tags = await findTags();
  const parsedTags: Tag[] = TagsSchema.parse(tags);

  const categories = await findCategories();
  const parsedCategories: Category[] = CategoriesSchema.parse(categories);

  return (
    <div className="mx-auto my-6 flex w-full max-w-[1024px] flex-col space-y-6 p-6 md:w-1/2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nouvelle recette</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <NewEmptyRecipeForm categories={parsedCategories} tags={parsedTags} />
    </div>
  );
};

export default NewRecipePage;
