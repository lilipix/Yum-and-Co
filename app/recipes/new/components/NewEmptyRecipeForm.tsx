"use client";

import { z } from "zod";
import RecipeForm, { GeneralRecipeInformationFieldsSchema } from "./GeneralRecipeInformationFields";
import { IngredientsListFieldsSchema } from "./IngredientsListFields";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createRecipe } from "@/app/services/recipes.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { RecipePreparationFieldSchema } from './RecipePreparationField';

const IngredientsListForm = dynamic(() => import("./IngredientsListFields"));

const GeneralRecipeInformationForm = dynamic(
  () => import("./GeneralRecipeInformationFields")
);

const RecipePreparationForm = dynamic(() => import("./RecipePreparationField"));

export const NewEmptyRecipeFormSchema = z
  .object({})
  .merge(GeneralRecipeInformationFieldsSchema)
  .merge(IngredientsListFieldsSchema)
  .merge(RecipePreparationFieldSchema);

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
      category: "",
      labels: [],
      numberOfPersons: undefined,
      preparationTime: "",
      cookingTime: "",
      ovenTemperature: "",
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
     await createRecipe({
        ...values,
        category: values.category ?? "",
        numberOfPersons: values.numberOfPersons ?? null,
        preparationTime: values.preparationTime ?? "",
        cookingTime: values.cookingTime ?? "",
        ovenTemperature: values.ovenTemperature ?? "",
        preparation: values.preparation ?? "",
      });
      form.reset({ ...values });
    } catch (error) {
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  const handleCancel = () => router.push(`/`);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col md:w-1/2 mx-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="m-4 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent>
                <RecipeForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ingrédients</CardTitle>
              </CardHeader>
              <CardContent>
                <IngredientsListForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Préparation</CardTitle>
              </CardHeader>
              <CardContent>
                <RecipePreparationForm />
              </CardContent>
            </Card>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button disabled={isLoading} type="submit" variant="pink">
                Enregistrer
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : ""}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewEmptyRecipeForm;
