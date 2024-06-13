"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCategory from "@/context/category/useCategory";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

const ConfirmDeleteModal = () => {
  const { category, deleteCategory, isLoading, isMutating } = useCategory();

  const handleDelete = async () => {
    try {
      await deleteCategory();
      toast.success("La catégorie a été supprimée avec succès.");
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la suppression de la catégorie.",
      );
      console.error("Failed to delete category", error);
    }
  };

  return (
    <DialogHeader className="space-y-4">
      <DialogTitle>Supprimer la catégorie {category?.name}</DialogTitle>
      <DialogDescription className="text-destructive">
        Pour supprimer cette catégorie, veuillez modifier les catégories des
        recettes associées ou supprimer les recettes.
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

export default ConfirmDeleteModal;
