"use client";
import { UpdateCategorySchema } from "@/app/api/categories/_validators/update-category.validator";
import { Category } from "@/validators/category";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";
import { updateCategory as updateCategoryRequest } from "@/services/categories.service";
import CategoryContext, { CategoryContextValue } from ".";

type CategoryProviderProps = {
  children: ReactNode;
  category?: Category | null;
};

const CategoryProvider = ({
  category: initialCategory,
  children,
}: CategoryProviderProps) => {
  const [isMutating, setIsMutating] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<Category | null>(
    "/api/categories/",
    { fallbackData: initialCategory },
  );

  const updateCategory = useCallback(
    async (category: z.infer<typeof UpdateCategorySchema>) => {
      try {
        if (!data) {
          toast.error("Pas de catégories trouvées. Merci d'en créer une.");
          return null;
        }
        setIsMutating(true);
        const updatedCategory = await updateCategoryRequest({
          ...category,
          id: data.id,
        });
        await mutate(updatedCategory);
        return updatedCategory;
      } catch (error) {
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contextValue: CategoryContextValue = useMemo(
    () => ({
      category: data,
      updateCategory,
      isMutating,
      error,
      isLoading,
      mutate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isMutating, error, isLoading, updateCategory],
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
