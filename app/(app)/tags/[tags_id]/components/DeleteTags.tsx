import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import ConfirmDeleteTagModal from "./ConfirmDeleteTagModal";

const DeleteTags = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-8">
        <ConfirmDeleteTagModal />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTags;
