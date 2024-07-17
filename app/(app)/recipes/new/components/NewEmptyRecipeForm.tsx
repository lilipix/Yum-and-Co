"use client";

import { IngredientsListFieldsSchema } from "../../components/form-fields/IngredientsListFields";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { RecipePreparationFieldSchema } from "../../components/form-fields/RecipePreparationField";
import { Category } from "@/validators/category";
import { toast } from "sonner";
import useRecipe from "@/context/recipe/useRecipe";
import { GeneralRecipeInformationFieldsSchema } from "../../components/form-fields/GeneralRecipeInformationFields";
import { Tag } from "@/validators/tag";
import { z } from "zod";

const IngredientsListForm = dynamic(
  () => import("../../components/form-fields/IngredientsListFields"),
);

const GeneralRecipeInformationFields = dynamic(
  () => import("../../components/form-fields/GeneralRecipeInformationFields"),
);

const RecipePreparationForm = dynamic(
  () => import("../../components/form-fields/RecipePreparationField"),
);

type NewEmptyRecipeFormProps = {
  categories: Category[];
  tags: Tag[];
};

export const NewEmptyRecipeFormSchema = z
  .object({})
  .merge(GeneralRecipeInformationFieldsSchema)
  .merge(IngredientsListFieldsSchema)
  .merge(RecipePreparationFieldSchema);

export type NewEmptyRecipeFormValues = z.infer<typeof NewEmptyRecipeFormSchema>;

const NewEmptyRecipeForm = ({ categories, tags }: NewEmptyRecipeFormProps) => {
  const router = useRouter();
  const { createRecipe, isMutating, isLoading } = useRecipe();

  const form = useForm<NewEmptyRecipeFormValues>({
    resolver: zodResolver(NewEmptyRecipeFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      category: "",
      tags: [],
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
      await createRecipe(values);
      form.reset({ ...values });
      toast.success("Recette enregistrée avec succès.", { duration: 5000 });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur capturée:", error);
        toast.success("Recette enregistrée avec succès.", { duration: 5000 });
        if (error.message === "DuplicateTitleError") {
          toast.error(
            "Le titre de la recette existe déjà, veuillez en choisir un autre.",
            { duration: 5000 },
          );
        } else {
          toast.error("Erreur lors de l'enregistrement de la recette.", {
            duration: 5000,
          });
        }
      }
    } finally {
      router.push("/");
      toast.dismiss();
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
                <GeneralRecipeInformationFields
                  categories={categories}
                  tags={tags}
                />
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
              <Button disabled={isLoading || isMutating} type="submit">
                Enregistrer
                {isMutating ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewEmptyRecipeForm;
