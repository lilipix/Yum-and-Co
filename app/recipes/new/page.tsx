import { Plus } from "lucide-react";
import NewEmptyRecipeForm from "./components/NewEmptyRecipeForm";
import connectToDatabase from "@/lib/mongodb";
import { findCategories } from "@/database/categories/category.repository";
import { CategoriesSchema, ICategory } from "@/validators/category";
import { findRecipeByTitle } from "@/database/recipes/recipe.repository";
import { Tag, TagsSchema } from '@/validators/tag';
import { findTags } from '@/database/tags/tag.repository';

const NewRecipePage = async () => {
  await connectToDatabase();

  const categories = await findCategories();
  const parsedCategories: ICategory[] = CategoriesSchema.parse(categories);
  const tags = await findTags();
  const parsedTags: Tag[] = TagsSchema.parse(tags);


  return (
    <div className="mx-2 my-8">
      <NewEmptyRecipeForm categories={parsedCategories} tags={parsedTags}/>
    </div>
  );
};

export default NewRecipePage;
