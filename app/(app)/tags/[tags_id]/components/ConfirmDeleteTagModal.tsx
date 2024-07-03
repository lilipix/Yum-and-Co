"use client";

import useTags from "@/context/tags/useTags";
import React from "react";
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
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/lib/utils/string.utils";

const ConfirmDeleteTagModal = () => {
  const { tags, deleteTags, isLoading, isMutating } = useTags();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteTags();
      toast.success(
        "La suppression du ou des tags s'est déroulée avec succès.",
      );
      router.push("/");
    } catch (error) {
      console.error("Failed to delete tag", error);
      toast.error(
        "Une erreur s'est produite lors de la suppression du ou des tags.",
      );
    }
  };

  return (
    <DialogHeader className="space-y-4">
      <DialogTitle>
        Supprimer{" "}
        {tags?.map((tag) => capitalizeFirstLetter(tag.name)).join(", ")} ?
      </DialogTitle>
      <DialogDescription className="text-destructive">
        {`Êtes-vous sûr de vouloir supprimer ${tags && tags?.length > 1 ? "les tags suivants" : "le tag suivant"} : ${tags?.map((tag) => `"${capitalizeFirstLetter(tag.name)}"`).join(", ")}? Cette action est irréversible.`}
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

export default ConfirmDeleteTagModal;
