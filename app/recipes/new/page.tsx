import { Plus } from "lucide-react";
import NewEmptyRecipeForm from "./components/NewEmptyRecipeForm";
import connectToDatabase from "@/lib/mongodb";
import { findCategories } from "@/database/categories/category.repository";
import { CategoriesSchema, ICategory } from "@/validators/category";

const NewRecipePage = async () => {
  await connectToDatabase();

  const categories = await findCategories();
  console.log(categories);
  const parsedCategories: ICategory[] = CategoriesSchema.parse(categories);

  return (
    <div className="mx-2 my-8">
      <NewEmptyRecipeForm categories={parsedCategories} />
    </div>
  );
};

export default NewRecipePage;
