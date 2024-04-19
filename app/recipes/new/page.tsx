import { Plus } from 'lucide-react';
import React from 'react';
import NewEmptyRecipeForm from './components/NewEmptyRecipeForm';



const NewRecipePage = () => {
    return (

         <div className="my-8 mx-2">
            {/* <h1 className="flex items-center text-2xl mb-2">
              <Plus /> Ajouter une recette
            </h1> */}
            <NewEmptyRecipeForm />
        </div>
    );
};

export default NewRecipePage;