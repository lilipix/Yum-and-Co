import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import ConfirmDeleteRecipeModal from "./ConfirmDeleteRecipeModal";

const DeleteRecipe = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-8">
        <ConfirmDeleteRecipeModal />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRecipe;
