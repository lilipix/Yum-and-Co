import { z } from 'zod';
import { CreateRecipeSchema } from '../api/recipes/_validators/create-recipe.validator';
import {  RecipePopulated, RecipePopulatedSchema } from '@/validators/recipe';

export const createRecipe = async ({...recipe}: z.infer<typeof CreateRecipeSchema>): Promise<RecipePopulated> => {
    console.log(recipe);
    try {
        const data = await fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...recipe}),
        });

//         if (data.ok) {
//             return RecipePopulatedSchema.parse(data);
//         }

//         throw new Error('Failed to create recipe');

//     } catch (error) {
// 		throw error;
// 	}
// }

console.log("Response from API:", data);  // Log the entire Response object

if (data.ok) {
    const jsonData = await data.json();  // Convert response to JSON
    console.log("JSON data parsed from response:", jsonData);  // Log the parsed JSON data
    return RecipePopulatedSchema.parse(jsonData);
}

const errorData = await data.text();  // Get error response as text
console.log("Error response from API:", errorData);  // Log the error response
throw new Error('Failed to create recipe');

} catch (error) {
console.log("Error caught in createRecipe:", error);  // Log the error caught
throw error;
}
}
