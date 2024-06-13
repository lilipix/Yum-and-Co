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

const EditCategory = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-8">
        <EditCategoryModal />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
