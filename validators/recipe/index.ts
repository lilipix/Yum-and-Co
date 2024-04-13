import { z } from "zod";
import { IngredientValidator } from './ingredient.validator';


export const RecipeValidator = z.object({
  id: z.coerce.string().min(1, 'Cannot be empty.').optional(),
  title: z.coerce.string().min(1, "Cannot be empty."),
  toReceive: z.coerce.boolean().nullable(),
  category: z.coerce.string(),
  label: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().nullable(),
  preparationTime: z.coerce.string().nullable(),
  cookingTime: z.coerce.string().nullable(),
  ovenTemperature: z.coerce.string().nullable(),
  ingredients: z.array(IngredientValidator),
  preparation: z.coerce.string().nullable(),
});

export interface IRecipe extends z.infer<typeof RecipeValidator> {}
