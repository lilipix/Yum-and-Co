import CreateSelect from "@/app/components/Select/CreateSelect";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useCategoryCreate from '@/hooks/useCategoryCreate';
import { ICategory } from "@/validators/category";
import { ReactNode } from 'react';
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const RecipeCategorySelectFieldSchema = z.object({
  category: z.string({ required_error: "Requis." }).min(1, { message: "La catégorie doit être renseigné." }),
});

export type RecipeCategorySelectFieldValues = z.infer<
  typeof RecipeCategorySelectFieldSchema
>;

type RecipeCategoriesSelectFieldProps = {
  categories: ICategory[];
  allowMultiple?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  label?: ReactNode;
};

const RecipeCategoriesSelectField = ({
  categories,
  isDisabled = false, label = "Catégorie *"
}: RecipeCategoriesSelectFieldProps) => {

  const form = useFormContext<RecipeCategorySelectFieldValues>();
  const initialCategory = { id: '', name: '' };
  const {isLoading, createCategory: handleCreateCategory} = useCategoryCreate(initialCategory)

  const categoriesOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

 
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => {
        const handleChange = (value: string | string[]) => {
          field.onChange(value);
        };
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <CreateSelect
              disabled={isDisabled}
              isLoading={isLoading}
              options={categoriesOptions}
              value={field.value}
              onCreateOption={ handleCreateCategory }
              onSelect={handleChange}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RecipeCategoriesSelectField;
