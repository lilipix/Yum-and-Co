import connectToDatabase from '@/lib/mongodb';
import AddRecipeButton from "./components/AddRecipeButton";
import { findCategories } from '@/database/categories/category.repository';
import CategoriesList from './components/CategoriesList';

const HomePage =  async() =>{

  await connectToDatabase();
  const categories = await findCategories();

  return (
    <main className="flex flex-col items-center p-6">
      <AddRecipeButton />
      <CategoriesList 
      categories={categories.length === 0 ? [] : categories} />
    </main>
  );
}

export default HomePage;
