import CreateSelect from '@/app/components/Select/CreateSelect';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ICategory } from '@/validators/category';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const RecipeCategoriesSelectFieldSchema = z.object({ categories: z.array( 
   z.coerce
    .string({ required_error: "Requis." })
    .min(1, { message: "La catégorie doit être renseigné." })
    .transform((value) => value.toLowerCase()),
)
});

export type RecipeCategoriesSelectFieldValues = z.infer<typeof RecipeCategoriesSelectFieldSchema>;

type RecipeCategoriesSelectFieldProps = {
    categories: ICategory[];
    allowMultiple?: boolean;
    placeholder?: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    onCreateOption?: boolean;
}

const RecipeCategoriesSelectField = ({categories, isDisabled = false, allowMultiple = false, isLoading = false, onCreateOption = true }: RecipeCategoriesSelectFieldProps) => {

    const form = useForm<RecipeCategoriesSelectFieldValues>();

    const categoriesOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));
            return (
       <FormField
       control={ form.control}
       name="categories"
       render={ ({ field }) => {
        const handleChange = (value: string | string[]) => {
            field.onChange(value);
        };
        return (
            <FormItem>
                <FormLabel>Categorie *</FormLabel>
                <CreateSelect
                // allowMultiple={ allowMultiple }
                disabled={ isDisabled }
                // enableColors={ enableColors }
                onCreateOption={ onCreateOption }
                isLoading={ isLoading }
                options={ categoriesOptions }
                value={ field.value }
                // onCreateOption={ handleCreateGroupLevel }
                onSelect={ handleChange }
            />
            <FormMessage />
        </FormItem>
    );
} }
/>
);
};


export default RecipeCategoriesSelectField;