import { Plus } from "lucide-react";
import Link from "next/link";

const AddRecipeButton = () => {
  return (
    <Link
      href="recipes/new"
      className="fixed bottom-8 right-8 flex cursor-pointer flex-row items-center gap-2 rounded-full bg-pinklight transition duration-150 ease-in-out hover:border-pinklight hover:bg-pinkMedium lg:rounded-xl lg:px-4 lg:py-2"
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
