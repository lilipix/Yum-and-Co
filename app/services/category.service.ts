import { CategorySchema, ICategory } from '@/validators/category';

export const createCategory = async (category: ICategory): Promise<ICategory>=> {
  try {
    const data = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...category }),
    });

    if (data.ok) {
      return CategorySchema.parse(data);
    }

    throw new Error("Failed to create category");
  } catch (error) {
    throw error;
  }
}