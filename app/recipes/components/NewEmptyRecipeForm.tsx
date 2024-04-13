"use client";

import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Plus } from "lucide-react";

import { redirect, useRouter } from "next/navigation";

import RecipeForm, {
  RecipeFormSchema,
} from "@/app/(app)/_components/RecipeForm";
import { IngredientsListFormSchema } from "@/app/(app)/_components/IngredientsListForm";
import { Category } from '../../../../../../schemas/recipe/category.schema';
import useRecipe from '../../../../../../context/recipes/recipe/useRecipe';
import { createRecipe } from '../../../../../../services/recipes.service';

export const NewEmptyRecipeFormSchema = z
  .object({})
  .merge(RecipeFormSchema)
  .merge(IngredientsListFormSchema);

export type NewEmptyRecipeFormValues = z.infer<typeof NewEmptyRecipeFormSchema>;

const NewEmptyRecipeForm = () => {
  const { isLoading, setIsLoading } = useRecipe();
  const router = useRouter();

  const form = useForm<NewEmptyRecipeFormValues>({
    resolver: zodResolver(NewEmptyRecipeFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      toReceive: false,
      category: Category.APPETIZER,
      numberOfPersons: undefined,
      preparationTime: undefined,
      cookingTime: undefined,
      ovenTemperature: undefined,
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
        toReceive: values.toReceive ?? false,
        numberOfPersons: values.numberOfPersons ?? null,
        preparationTime: values.preparationTime ?? null,
        cookingTime: values.cookingTime ?? null,
        ovenTemperature: values.ovenTemperature ?? null,
        preparation: values.preparation ?? null,
      });
      form.reset({ ...values });
      redirect(`/`);
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
