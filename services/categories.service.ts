import { CategorySchema, Category } from "@/validators/category";
import { toast } from "sonner";
import { z } from "zod";

export const fetchCategories = async () => {
  try {
    const response = await fetch("/api/categories");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Categories are undefined in the response:", data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

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

export const deleteCategory = async (categoryId: string): Promise<Category> => {
  try {
    const response = await fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete category");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
