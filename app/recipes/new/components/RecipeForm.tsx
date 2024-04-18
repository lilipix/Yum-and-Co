import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CategorySchema } from '@/validators/category';
import { IngredientSchema } from '@/validators/recipe/ingredient.validator';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

const IngredientsListForm = dynamic(() => import("./IngredientsListForm"));

export const RecipeFormSchema = z.object({
  title: z.coerce.string().min(1, "Cannot be empty."),
  category: z.coerce.string(),
  labels: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().optional().nullable(),
  preparationTime: z.coerce.string().optional().nullable(),
  cookingTime: z.coerce.string().optional().nullable(),
  ovenTemperature: z.coerce.string().optional().nullable(),
  ingredients: z.array(IngredientSchema).nullable(),
  preparation: z.coerce.string().optional().nullable(),
});

export type RecipeFormValues = z.infer<typeof RecipeFormSchema>;

const RecipeForm = () => {
  const form = useFormContext<RecipeFormValues>();
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de la recette *</FormLabel>
            <FormControl>
              <Input 
                    {...field}
                    required
                    />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Catégorie</FormLabel>
            <FormControl>
              <Input 
                    {...field}
  
                    />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Choisissez une catégorie *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex justify-between"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="appetizer" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {getCategoryLabel(Category.APPETIZER)}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mainCourse" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {getCategoryLabel(Category.MAINCOURSE)}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="dessert" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {" "}
                    {getCategoryLabel(Category.DESSERT)}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <div className="flex gap-4 justify-between">
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="numberOfPersons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de personnes</FormLabel>
                <FormControl>
                  <Input
                    max="20"
                    min="0"
                    placeholder=""
                    step="1"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temps de préparation (en min)</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Temps de cuisson <br /> (en min)
                </FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/2">
          <FormField
            control={form.control}
            name="ovenTemperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Température du four (en °)
                </FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <IngredientsListForm />
      </div>

      <FormField
        control={form.control}
        name="preparation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Préparation *</FormLabel>
            <FormControl>
              <Textarea placeholder="" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RecipeForm;
