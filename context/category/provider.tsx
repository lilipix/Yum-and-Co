"use client";

import { UpdateCategorySchema } from "@/app/api/categories/_validators/update-category.validator";
import { Category } from "@/validators/category";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";
import {
  updateCategory as updateCategoryRequest,
  deleteCategory as deleteCategoryRequest,
} from "@/services/categories.service";
import CategoryContext, { CategoryContextValue } from ".";

type CategoryProviderProps = {
  children: ReactNode;
  category?: Category | null;
  categories?: Category[];
};

export type Subscriber = (categories: Category[]) => void;

const CategoryProvider = ({
  category: initialCategory,
  categories: initialCategories,
  children,
}: CategoryProviderProps) => {
  const [isMutating, setIsMutating] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const { data, error, isLoading, mutate } = useSWR<Category | null>(
    "/api/categories/",
    // provide initial data
    { fallbackData: initialCategory },
  );

  useEffect(() => {
    setCategories(initialCategories);
    {
      initialCategories && notifySubscribers(initialCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategories]);

  const notifySubscribers = useCallback(
    (updatedCategories: Category[]) => {
      subscribers.forEach((callback) => callback(updatedCategories));
    },
    [subscribers],
  );

  const subscribeToCategories = useCallback((callback: Subscriber) => {
    setSubscribers((subs) => [...subs, callback]);
    return () =>
      setSubscribers((subs) => subs.filter((sub) => sub !== callback));
  }, []);

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
        // Update the local cache
        await mutate(updatedCategory);
        {
          initialCategories && notifySubscribers(initialCategories);
        }
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

  const deleteCategory = useCallback(
    async () => {
      if (!data) {
        toast.error("Pas de catégories trouvées. Merci d'en créer une.");
        return null;
      }
      setIsMutating(true);
      try {
        const deletedCategory = await deleteCategoryRequest(data.id);
        await mutate(null);
        {
          initialCategories && notifySubscribers(initialCategories);
        }
        return deletedCategory;
      } catch (error) {
        console.error(error);
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
      deleteCategory,
      isMutating,
      error,
      isLoading,
      refetchCategory: mutate,
      subscribeToCategories,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      data,
      isMutating,
      error,
      isLoading,
      updateCategory,
      deleteCategory,
      mutate,
    ],
  );

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
