import { z } from "zod";
import { IngredientValidator } from './ingredient.validator';
import { CategoryValidator } from '../category';
import { LabelValidator } from '../label';


export const RecipeValidator = z.object({
  id: z.coerce.string().min(1, 'Cannot be empty.'),
  title: z.coerce.string().min(1, "Cannot be empty."),
  category: z.coerce.string(),
  labels: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().nullable(),
  preparationTime: z.coerce.string().nullable(),
  cookingTime: z.coerce.string().nullable(),
  ovenTemperature: z.coerce.string().nullable(),
  ingredients: z.array(IngredientValidator),
  preparation: z.coerce.string().nullable(),
});

export type Recipe = z.infer<typeof RecipeValidator>;

export const RecipePopulatedValidator = RecipeValidator.omit({
  labels: true,
  category: true,
}).merge(z.object({
  category: CategoryValidator,
  labels: z.array(LabelValidator),
}));

export type RecipePopulated = z.infer<typeof RecipePopulatedValidator>;