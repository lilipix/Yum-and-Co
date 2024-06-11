import { UpdateCategorySchema } from "@/app/api/categories/_validators/update-category.validator";
import { Category } from "@/validators/category";
import { createContext } from "react";
import { z } from "zod";

export type CategoryContextValue = {
  category?: Category | null;
  isLoading: boolean;
  isMutating: boolean;
  error: Error | null;
  updateCategory: (
    category: z.infer<typeof UpdateCategorySchema>,
  ) => Promise<Category | null>;
};

const CategoryContext = createContext<CategoryContextValue | null>(null);

export default CategoryContext;
