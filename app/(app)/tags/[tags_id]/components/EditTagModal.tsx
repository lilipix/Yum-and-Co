"use client";

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
import { ColorPalette, Tag } from "@/validators/tag";
import useTags from "@/context/tags/useTags";
import TagFormBlock from "./TagFormBlock";
import { useEffect } from "react";

const EditTagModalSchema = z.object({
  name: z.string().min(1, "Requis"),
  color: z.nativeEnum(ColorPalette).optional(),
});

type EditTagValues = z.infer<typeof EditTagModalSchema>;

const EditTagModal = () => {
  const { tags, updateTag, isLoading, isMutating } = useTags();
  const form = useForm<EditTagValues>({
    resolver: zodResolver(EditTagModalSchema),
    mode: "onSubmit",
    defaultValues: {
      name: tags?.[0].name,
      color: tags?.[0]?.color,
    },
  });

  const handleSubmit = async (values: EditTagValues) => {
    if (!tags) {
      toast.error("Pas de tags trouvés. Merci d'en créer un.");
      return;
    }
    if (tags.length > 1) {
      toast.warning(
        "La modification n'est autorisée que lorsqu'un seul tag est présent.",
      );
      return;
    }
    try {
      const tag = tags[0];
      await updateTag({
        ...values,
        id: tag.id,
      });
      toast.success("Le tag a été mis à jour avec succès.");
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la mise à jour du tag.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>Modifier le nom et la couleur du tag</DialogTitle>
          <DialogDescription>
            Le tag sera modifié sur toutes les recettes rattachées à ce tag.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TagFormBlock />
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
            <DialogClose asChild>
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
            </DialogClose>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditTagModal;
