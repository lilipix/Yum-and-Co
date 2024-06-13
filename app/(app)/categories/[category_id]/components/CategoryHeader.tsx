"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import useCategory from "@/context/category/useCategory";
import React from "react";

const CategoryHeader = () => {
  const { category } = useCategory();
  return (
    <div>
      <CardTitle>{category?.name}</CardTitle>
      <CardDescription>
        <span className="block sm:inline">Visualisez les recettes de la</span>{" "}
        catégorie {category?.name}.
      </CardDescription>
    </div>
  );
};

export default CategoryHeader;
