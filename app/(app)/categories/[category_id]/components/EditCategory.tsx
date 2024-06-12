"use client";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import EditCategoryModal1 from "./EditCategoryModalTest";
import EditCategoryModalTest from "./EditCategoryModalTest";

const EditCategory = () => {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleOpenModal = () => setIsModalOpen(true);
  // const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <div className="my-8 flex flex-col items-center gap-8">
        <DialogContent>
          <EditCategoryModalTest
          // onClose={handleCloseModal}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditCategory;
