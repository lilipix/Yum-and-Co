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
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditCategoryModalTestProps = {
  //   onClose: () => void;
  currentCategory: string;
};

type EditCategoryValues = z.infer<typeof CategoryFormBlockSchema>;

const EditCategoryModalTest = ({
  currentCategory,
}: EditCategoryModalTestProps) => {
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
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <DialogHeader>
            <DialogTitle>{`Modifier la catégorie ${currentCategory}`}</DialogTitle>
            <DialogDescription>
              La catégorie sera modifiée sur toutes les recettes rattachées à
              cette catégorie.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <CategoryFormBlock />
          </div>
          <DialogFooter>
            <div className="flex w-full justify-between">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="items-center gap-2"
                >
                  Annuler
                </Button>
              </DialogClose>
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
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
};

export default EditCategoryModalTest;
