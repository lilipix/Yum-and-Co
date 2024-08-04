import connectToDatabase from "@/lib/mongodb";
import AddRecipeButton from "./_components/AddRecipeButton";
import { findCategories } from "@/database/categories/category.repository";
import CategoriesList from "./_components/CategoriesList";
import TagsList from "./_components/TagsList";

import { findTags } from "@/database/tags/tag.repository";
import {
  findLatestRecipesAdded,
  findPinnedRecipes,
  findRecipes,
} from "@/database/recipes/recipe.repository";
import LoadingSvg from "@/assets/svg/LoadingSvg";
import TagsProvider from "@/context/tags/provider";
import PinnedRecipesList from "./_components/PinnedRecipesList";
import LatestRecipesAdded from "./_components/LatestRecipesAdded";

const HomePage = async () => {
  await connectToDatabase();
  const categories = await findCategories();
  const tags = await findTags();
  const recipes = await findRecipes();
  const pinnedRecipes = await findPinnedRecipes();
  const latestRecipesAdded = await findLatestRecipesAdded();

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <AddRecipeButton />
      <CategoriesList
        initialCategories={categories.length === 0 ? [] : categories}
      />
      <TagsList initialTags={tags.length === 0 ? [] : tags} recipes={recipes} />
      <PinnedRecipesList pinnedRecipes={pinnedRecipes} />
      <LatestRecipesAdded latestRecipesAdded={latestRecipesAdded} />
    </main>
  );
};

export default HomePage;
