"use client";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import EditCategoryModal from "./EditCategoryModal";

type EditCategoryProps = {
  currentCategory: string;
};
const EditCategory = ({ currentCategory }: EditCategoryProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-8">
        <EditCategoryModal currentCategory={currentCategory} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
