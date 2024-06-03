import { ColorPalette } from '@/validators/tag';
import { z } from 'zod';

export const RecipeTagsSelectFieldSchema = z.object({
    tags: z.array(z.string({ required_error: "Requis." })
    .min(1, { message: "La catégorie doit être renseigné." })),
});

export type RecipeTagsSelectFieldValues = z.infer<typeof RecipeTagsSelectFieldSchema>;


const RecipeTagsSelectField = () => {
    return (
        <div>
            
        </div>
    );
};

export default RecipeTagsSelectField;