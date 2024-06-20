"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import useCategory from "@/context/category/useCategory";
import React from "react";

const CategoryHeader = () => {
  const { category } = useCategory();
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
