import { UpdateCategorySchema } from "@/app/api/categories/_validators/update-category.validator";
import { fetcher } from "@/lib/utils/fetcher.utils";
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

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [isMutating, setIsMutating] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<Category | null>(
    "/api/categories",
    fetcher,
    {
      fallbackData: null,
    },
  );

  const updateCategory = useCallback(
    async (category: z.infer<typeof UpdateCategorySchema>) => {
      try {
        if (!data) {
          toast.error("Pas de catégories trouvées. Merci d'en créer une.");
          return null;
        }
        setIsMutating(true);
        const updatedCategory = await mutate(
          updateCategoryRequest({
            ...category,
          }),
          { optimisticData: category, rollbackOnError: true },
        );
        return updatedCategory || null;
      } catch (error) {
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const contextValue: CategoryContextValue = useMemo(
    () => ({
      category: data,
      updateCategory,
      isMutating,
      error,
      isLoading,
    }),
    [updateCategory, data, isMutating, error, isLoading],
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
