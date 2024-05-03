"use client";
import { ICategory } from "@/validators/category";
import { createCategory as createCategoryRequest } from "@/app/services/category.service";
import { useState } from "react";

const useCategoryCreate = (initialCategory: ICategory) => {
  const [category, setCategory] = useState<ICategory>(initialCategory);
  const [isLoading, setIsLoading] = useState(false);

const createCategory = async (name: string) => {
  console.log('NAME', name);
    try {
      setIsLoading(true);
      const category = await createCategoryRequest({ name });
      setCategory(category);
      return {
        value: category.id,
        label: category.name,
      };
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { category, createCategory, isLoading };

};


export default useCategoryCreate;
