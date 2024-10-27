import { Plus } from "lucide-react";
import Link from "next/link";

const AddRecipeButton = () => {
  return (
    <Link
      href="recipes/new"
      className="fixed bottom-8 right-6 z-10 flex border-spacing-2 cursor-pointer flex-row items-center gap-2 rounded-full border-2 border-card bg-pinkdark transition duration-150 ease-in-out hover:border-pinklight hover:bg-pinkMedium md:right-8 lg:rounded-xl lg:px-4 lg:py-2"
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
