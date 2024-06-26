"use client";
import { Category } from "@/validators/category";
import { createCategory as createCategoryRequest } from "@/services/categories.service";
import { useState } from "react";

const useCategoryCreate = (initialCategories: Category[]) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = async (name: string) => {
    try {
      setIsLoading(true);
      const category = await createCategoryRequest({ name });
      setCategories([...categories, category]);
      const result = {
        value: category.id,
        label: category.name,
      };
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { categories, createCategory, isLoading };
};

export default useCategoryCreate;
