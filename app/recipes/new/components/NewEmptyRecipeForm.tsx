"use client";

import { z } from 'zod';
import RecipeForm, { RecipeFormSchema } from './RecipeForm';
import { IngredientsListFormSchema } from './IngredientsListForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  useForm } from 'react-hook-form';
import { createRecipe } from '@/app/services/recipes.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Form } from '@/components/ui/form';


export const NewEmptyRecipeFormSchema = z
  .object({})
  .merge(RecipeFormSchema)
  .merge(IngredientsListFormSchema);

export type NewEmptyRecipeFormValues = z.infer<typeof NewEmptyRecipeFormSchema>;

const NewEmptyRecipeForm = () => {
//   const { isLoading, setIsLoading } = useRecipe();
const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<NewEmptyRecipeFormValues>({
    resolver: zodResolver(NewEmptyRecipeFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      category : '',
      labels: [],
      numberOfPersons: undefined,
      preparationTime: '',
      cookingTime: '',
      ovenTemperature: '',
      ingredients: [
        {
          name: "",
          baseQuantity: undefined,
          unit: undefined,
        },
      ],
      preparation: "",
    },
  });

  const handleSubmit = async ({ ...values }: NewEmptyRecipeFormValues) => {
    try {
      setIsLoading(true);
      const createdRecipe = await createRecipe({
        ...values,
        category: '',
        labels:  [],
        numberOfPersons: null,
        preparationTime:  '',
        cookingTime: '',
        ovenTemperature: '',
        preparation: '',
      });
      form.reset({ ...values });
      router.push(`/`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoPrevious = () => router.push(`/`);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col md:w-1/2 mx-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="m-8">
            <RecipeForm />
            <div className="flex justify-center mt-4">
              <Button disabled={isLoading} type="submit">
                Enregistrer
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : ""}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Button
        className="gap-2 items-center"
        disabled={isLoading}
        type="button"
        variant="outline"
        onClick={handleGoPrevious}
      >
        <ArrowLeft size="16" />
        Précédent
      </Button>
    </div>
  );
};

export default NewEmptyRecipeForm;
