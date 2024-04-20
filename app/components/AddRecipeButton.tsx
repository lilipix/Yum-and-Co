import { Plus } from "lucide-react";
import Link from "next/link";

const AddRecipeButton = () => {
  return (
    <Link
      href="recipes/new"
      className="flex flex-row items-center gap-2 border-2 border-pinkMedium rounded-full bg-pinkLight lg:py-2 lg:px-4 lg:rounded-xl fixed bottom-8 right-8 hover:bg-pinkMedium hover:border-pinkLight transition duration-150 ease-in-out cursor-pointer"
    >
      <div>
        <Plus className="m-3" />
      </div>
      <div className="hidden text-xl font-semibold lg:inline-flex">
        Ajouter une recette
      </div>
    </Link>
  );
};

export default AddRecipeButton;
