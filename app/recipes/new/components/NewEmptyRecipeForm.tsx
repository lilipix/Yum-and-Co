"use client";

import { z } from "zod";
import { GeneralRecipeInformationFieldsSchema } from "./GeneralRecipeInformationFields";
import { IngredientsListFieldsSchema } from "./IngredientsListFields";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createRecipe } from "@/app/services/recipes.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { RecipePreparationFieldSchema } from "./RecipePreparationField";
import { ICategory } from "@/validators/category";
import { toast } from "sonner";

const IngredientsListForm = dynamic(() => import("./IngredientsListFields"));

const GeneralRecipeInformationFields = dynamic(
  () => import("./GeneralRecipeInformationFields"),
);

const RecipePreparationForm = dynamic(() => import("./RecipePreparationField"));

type NewEmptyRecipeFormProps = {
  categories: ICategory[];
};

export const NewEmptyRecipeFormSchema = z
  .object({})
  .merge(GeneralRecipeInformationFieldsSchema)
  .merge(IngredientsListFieldsSchema)
  .merge(RecipePreparationFieldSchema);

export type NewEmptyRecipeFormValues = z.infer<typeof NewEmptyRecipeFormSchema>;

const NewEmptyRecipeForm = ({ categories }: NewEmptyRecipeFormProps) => {
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
        category: values.category,
        numberOfPersons: values.numberOfPersons ?? null,
        preparationTime: values.preparationTime ?? "",
        cookingTime: values.cookingTime ?? "",
        ovenTemperature: values.ovenTemperature ?? "",
        preparation: values.preparation ?? "",
      });
      form.reset({ ...values });
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la recette", {duration: 5000});
    } finally {
      toast.success("Recette enregistrée avec succès", {duration: 5000});
      setIsLoading(false);
      router.push("/");
    }
  };

  const handleCancel = () => router.push(`/`);

  return (
    <div>
      <Form {...form}>
        <form
          className="mx-auto flex flex-col md:w-1/2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="m-4 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent>
                <GeneralRecipeInformationFields categories={categories} />
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
              <Button disabled={isLoading} type="submit">
                Enregistrer
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewEmptyRecipeForm;
