import { RecipeSchema } from '@/validators/recipe';
import { z } from 'zod';

export const CreateRecipeSchemaDTO = RecipeSchema.omit({
    id: true,
})

export type CreateRecipeDTO = z.infer<typeof CreateRecipeSchemaDTO>;

export const UpdateRecipeSchemaDTO = RecipeSchema.merge(z.object({
    id: z.coerce.string().min(1, 'Cannot be empty.'),
}));

export type UpdateRecipeDTO = z.infer<typeof UpdateRecipeSchemaDTO>;
