import CreateSelect from "@/app/components/Select/CreateSelect";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useCategoryCreate from '@/hooks/useCategoryCreate';
import { ICategory } from "@/validators/category";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const RecipeCategoriesSelectFieldSchema = z.object({
  category: z.coerce
    .string({ required_error: "Requis." })
    // // .min(1, { message: "La catégorie doit être renseigné." }),
});

export type RecipeCategoriesSelectFieldValues = z.infer<
  typeof RecipeCategoriesSelectFieldSchema
>;

type RecipeCategoriesSelectFieldProps = {
  categories: ICategory[];
  allowMultiple?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  onCreateOption?: boolean;
};

const RecipeCategoriesSelectField = ({
  categories,
  isDisabled = false,
}: RecipeCategoriesSelectFieldProps) => {
  const form = useForm<RecipeCategoriesSelectFieldValues>();

// TODO : ajouter un paramètre dans useCategoryCreate : initialCategory
//TODO : comprendre le hook et le modifier éventuellement 
  const {isLoading, createCategory: handleCreateCategory} = useCategoryCreate()

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
          console.log('VALUE',value);
          field.onChange(value);
        };
        return (
          <FormItem>
            <FormLabel>Categorie *</FormLabel>
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
