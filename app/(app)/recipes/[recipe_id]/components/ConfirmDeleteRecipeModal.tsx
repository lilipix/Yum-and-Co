"use client";

import useRecipe from "@/context/recipe/useRecipe";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";

const ConfirmDeleteRecipeModal = () => {
  const router = useRouter();
  const { recipe, deleteRecipe, isLoading, isMutating } = useRecipe();

  const handleDelete = async () => {
    try {
      await deleteRecipe();
      toast.success("La recette a été supprimée avec succès.");
      router.push("/");
    } catch (error) {
      console.error("Failed to delete recipe", error);
      toast.error(
        "Une erreur s'est produite lors de la suppression de la recette.",
      );
    }
  };
  return (
    <DialogHeader className="space-y-4">
      <DialogTitle>Supprimer la recette ?</DialogTitle>
      <DialogDescription className="text-destructive">
        Etes vous sûrs de vouloir supprimer la recette {recipe?.title}? Cette
        action est irréversible.
      </DialogDescription>
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
            type="button"
            variant="destructive"
            onClick={handleDelete}
          >
            {isMutating ? (
              <Loader2 className="animate-spin" size="16" />
            ) : (
              <Trash size="16" />
            )}
            Supprimer
          </Button>
        </div>
      </DialogFooter>
    </DialogHeader>
  );
};

export default ConfirmDeleteRecipeModal;
