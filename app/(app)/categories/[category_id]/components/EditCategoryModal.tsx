import useCategory from "@/context/category/useCategory";
import React from "react";
import CategoryFormBlock, {
  CategoryFormBlockSchema,
} from "./CategoryFormBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type EditCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
type EditCategoryValues = z.infer<typeof CategoryFormBlockSchema>;

const EditCategoryModal = ({ onClose, isOpen }: EditCategoryModalProps) => {
  const { category, updateCategory, isLoading, isMutating } = useCategory();

  const form = useForm<EditCategoryValues>({
    resolver: zodResolver(CategoryFormBlockSchema),
    mode: "onSubmit",
    defaultValues: {
      name: category?.name,
    },
  });

  const handleSubmit = async (values: EditCategoryValues) => {
    if (!category) {
      toast.error("Pas de catégories trouvées. Merci d'en créer une.");
      return;
    }
    if (values) {
      try {
        await updateCategory({
          id: category.id,
          name: values.name,
        });
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la mise à jour de la catégorie.",
        );
      } finally {
        onClose();
      }
    }
  };

  return isOpen ? (
    <Form {...form}>
      <form
        // className="my-8 flex flex-col items-center gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle>Modifier la catégorie</CardTitle>
            <CardDescription>
              La catégorie sera modifiée sur toutes les recettes rattachées à
              cette catégorie.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryFormBlock />
          </CardContent>
          <CardFooter>
            <div className="flex">
              <Button className="items-center gap-2" onClick={onClose}>
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
          </CardFooter>
        </Card>
      </form>
    </Form>
  ) : null;
};

export default EditCategoryModal;
