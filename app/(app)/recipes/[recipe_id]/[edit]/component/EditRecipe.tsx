"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { z } from "zod";
import { GeneralRecipeInformationFieldsSchema } from "../../../components/form-fields/GeneralRecipeInformationFields";
import { IngredientsListFieldsSchema } from "../../../components/form-fields/IngredientsListFields";
import { RecipeCategorySelectFieldSchema } from "../../../components/form-fields/RecipeCategoriesSelectField";
import { RecipeTagsSelectFieldSchema } from "../../../components/form-fields/RecipeTagsSelectField";
import RecipePreparationField, {
  RecipePreparationFieldSchema,
} from "../../../components/form-fields/RecipePreparationField";
import { Tag } from "@/validators/tag";
import { Category } from "@/validators/category";
import useRecipe from "@/context/recipe/useRecipe";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Unit } from "@/validators/recipe/ingredient.validator";

const IngredientsListFields = dynamic(
  () => import("../../../components/form-fields/IngredientsListFields"),
);

const GeneralRecipeInformationFields = dynamic(
  () =>
    import("../../../components/form-fields/GeneralRecipeInformationFields"),
);

const RecipePreparationForm = dynamic(
  () => import("../../../components/form-fields/RecipePreparationField"),
);

type EditRecipeProps = {
  tags: Tag[];
  categories: Category[];
};

const EditRecipePageSchema = z
  .object({})
  .merge(GeneralRecipeInformationFieldsSchema)
  .merge(IngredientsListFieldsSchema)
  .merge(RecipeCategorySelectFieldSchema)
  .merge(RecipeTagsSelectFieldSchema)
  .merge(RecipePreparationFieldSchema);

type EditRecipePageValues = z.infer<typeof EditRecipePageSchema>;

const EditRecipe = ({ tags, categories }: EditRecipeProps) => {
  const { recipe, updateRecipe, isMutating, isLoading } = useRecipe();
  const router = useRouter();
  const form = useForm<EditRecipePageValues>({
    resolver: zodResolver(EditRecipePageSchema),
    mode: "onSubmit",
    defaultValues: {
      title: recipe?.title,
      category: recipe?.category.id || "",
      tags: recipe?.tags ? recipe.tags.map((tag) => tag.id) : [],
      numberOfPersons: recipe?.numberOfPersons || undefined,
      preparationTime: recipe?.preparationTime || "",
      cookingTime: recipe?.cookingTime || "",
      ovenTemperature: recipe?.ovenTemperature || "",
      ingredients: recipe?.ingredients
        ? recipe.ingredients
        : [{ name: "", baseQuantity: undefined, unit: null }],
      preparation: recipe?.preparation || "",
    },
  });

  const handleSubmit = async (values: EditRecipePageValues) => {
    if (!recipe) {
      toast.error("Pas de recettes trouvées");
      return;
    }

    try {
      await updateRecipe({ ...values, id: recipe.id });
      toast.success("La recette a été mise à jour avec succès.");
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour de la recette.",
      );
    }
  };

  const handleCancel = () => router.push(`/`);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-8">
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
              <IngredientsListFields />
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
            <Button
              className="items-center gap-2"
              disabled={isMutating || isLoading}
              type="submit"
            >
              {isMutating ? (
                <Loader2 className="animate-spin" size="16" />
              ) : (
                <Save size="16" />
              )}
              Enregistrer
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditRecipe;
