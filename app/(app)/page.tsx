import connectToDatabase from "@/lib/mongodb";
import AddRecipeButton from "./_components/AddRecipeButton";
import { findCategories } from "@/database/categories/category.repository";
import CategoriesList from "./_components/CategoriesList";
import TagsList from "./_components/TagsList";
import { findTags } from "@/database/tags/tag.repository";
import { findRecipes } from "@/database/recipes/recipe.repository";
import TagsProvider from "@/context/tags/provider";
import CategoryProvider from "@/context/categories/category/provider";
import { CategoriesProvider } from "@/context/categories/provider";

const HomePage = async () => {
  await connectToDatabase();
  const categories = await findCategories();
  const tags = await findTags();
  const recipes = await findRecipes();

  return (
    <main className="flex flex-col items-center gap-8 p-6">
      <AddRecipeButton />
      <CategoriesProvider>
        <CategoriesList
          initialCategories={categories.length === 0 ? [] : categories}
        />
      </CategoriesProvider>
      <TagsProvider tags={tags}>
        <TagsList
          initialTags={tags.length === 0 ? [] : tags}
          recipes={recipes}
        />
      </TagsProvider>
    </main>
  );
};

export default HomePage;
