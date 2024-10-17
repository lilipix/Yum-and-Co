"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import useCategory from "@/context/category/useCategory";
import { Category } from "@/validators/category";

type CategoryHeaderProps = {
  category: Category;
};
const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  return (
    <div>
      <CardTitle className="mb-4">{category?.name}</CardTitle>
      <CardDescription>
        Visualisez les recettes de la catégorie {category?.name}.
      </CardDescription>
    </div>
  );
};

export default CategoryHeader;
