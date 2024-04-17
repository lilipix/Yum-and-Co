import { RecipeValidator } from '@/validators/recipe';
import { z } from 'zod';

export const CreateRecipeValidatorDTO = RecipeValidator.omit({
    id: true,
})

export type CreateRecipeDTO = z.infer<typeof CreateRecipeValidatorDTO>;

export const UpdateRecipeValidatorDTO = RecipeValidator.merge(z.object({
    id: z.coerce.string().min(1, 'Cannot be empty.'),
}));

export type UpdateRecipeDTO = z.infer<typeof UpdateRecipeValidatorDTO>;
