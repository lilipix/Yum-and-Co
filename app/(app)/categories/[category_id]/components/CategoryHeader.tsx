"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import useCategory from "@/context/categories/category/useCategory";
import { Category } from "@/validators/category";
import { useEffect } from "react";

const CategoryHeader = () => {
  const { category } = useCategory();

  console.log(category);
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
