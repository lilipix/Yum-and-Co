"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EditTagModal from "./EditTagModal";
import { toast } from "sonner";
import useTags from "@/context/tags/useTags";

const EditTag = () => {
  const { tags } = useTags();

  const handleClickUpdateButton = () => {
    if (tags?.length !== 1) {
      toast.warning(
        "La modification n'est autorisée que lorsqu'un seul tag est sélectionné.",
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={tags?.length !== 1 ? "cursor-not-allowed opacity-50" : ""}
          onClick={handleClickUpdateButton}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      {tags?.length === 1 ? (
        <DialogContent className="flex flex-col items-center gap-8">
          <EditTagModal />
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default EditTag;
