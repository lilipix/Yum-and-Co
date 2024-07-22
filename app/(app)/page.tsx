import connectToDatabase from "@/lib/mongodb";
import AddRecipeButton from "./components/AddRecipeButton";
import { findCategories } from "@/database/categories/category.repository";
import CategoriesList from "./components/CategoriesList";
import TagsList from "./components/TagsList";

import { findTags } from "@/database/tags/tag.repository";
import {
  findPinnedRecipes,
  findRecipes,
} from "@/database/recipes/recipe.repository";
import LoadingSvg from "@/assets/svg/LoadingSvg";
import TagsProvider from "@/context/tags/provider";
import PinnedRecipesList from "./components/PinnedRecipesList";

const HomePage = async () => {
  await connectToDatabase();
  const categories = await findCategories();
  const tags = await findTags();
  const recipes = await findRecipes();
  const pinnedRecipes = await findPinnedRecipes();

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <AddRecipeButton />
      <CategoriesList
        initialCategories={categories.length === 0 ? [] : categories}
      />
      <TagsList initialTags={tags.length === 0 ? [] : tags} recipes={recipes} />
      <PinnedRecipesList pinnedRecipes={pinnedRecipes} />
    </main>
  );
};

export default HomePage;
