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

type EditCategoryProps = {
  currentCategory: string;
};
const EditCategory = ({ currentCategory }: EditCategoryProps) => {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleOpenModal = () => setIsModalOpen(true);
  // const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-8">
        <EditCategoryModalTest
          // onClose={handleCloseModal}
          currentCategory={currentCategory}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
