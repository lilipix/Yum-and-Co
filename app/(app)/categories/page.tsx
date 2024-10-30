import { Card } from "@/components/ui/card";
import { findCategories } from "@/database/categories/category.repository";
import connectToDatabase from "@/lib/mongodb";

type CategoriesPageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  await connectToDatabase();
  const categories = await findCategories();

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mx-auto max-w-[1280px]">
        <Card />
      </div>
    </div>
  );
};

export default CategoriesPage;
