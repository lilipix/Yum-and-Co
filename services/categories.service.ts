import { CategorySchema, Category } from "@/validators/category";
import { z } from "zod";

export const createCategory = async (
  category: Partial<Category>,
): Promise<Category> => {
  try {
    const data = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...category }),
    });

    if (data.ok) {
      const parsedData = await data.json();
      return CategorySchema.parse(parsedData);
    }

    throw new Error("Failed to create category");
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (
  category: z.infer<typeof CategorySchema>,
): Promise<Category> => {
  try {
    const data = await fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    if (data.ok) {
      const parsedData = await data.json();
      return CategorySchema.parse(parsedData);
    }

    throw new Error("Failed to update category");
  } catch (error) {
    throw error;
  }
};
