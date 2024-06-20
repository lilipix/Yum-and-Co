import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import React from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const DeleteCategory = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-8">
        <ConfirmDeleteModal />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
