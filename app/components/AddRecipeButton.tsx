import { Plus } from 'lucide-react';
import Link from 'next/link';

const AddRecipeButton = () => {
    return (
        // <div className="flex flex-row gap-2 border rounded-full bg-link px-2 lg:p-4 lg:rounded-xl fixed bottom-8 right-8 hover:bg-link-hover transition duration-150 ease-in-out cursor-pointer">
        <Link href="recipes/new"className="flex flex-row items-center gap-2 border rounded-full bg-link lg:p-4 lg:rounded-xl fixed bottom-8 right-8 hover:bg-link-hover transition duration-150 ease-in-out cursor-pointer">
         <div><Plus className="m-3"/></div> 
         <div className="hidden text-xl font-semibold lg:inline-flex">Ajouter une recette</div>
        </Link>
        // </div>
    );
};

export default AddRecipeButton;