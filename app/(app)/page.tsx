import connectToDatabase from "@/lib/mongodb";
import AddRecipeButton from "./components/AddRecipeButton";
import { findCategories } from "@/database/categories/category.repository";
import CategoriesList from "./components/CategoriesList";
import TagsList from "./components/TagsList";

import { findTags } from "@/database/tags/tag.repository";

const HomePage = async () => {
  await connectToDatabase();
  const categories = await findCategories();
  const tags = await findTags();

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <AddRecipeButton />
      <CategoriesList categories={categories.length === 0 ? [] : categories} />
      <TagsList tags={tags.length === 0 ? [] : tags} />
    </main>
  );
};

export default HomePage;
