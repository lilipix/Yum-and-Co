import { IngredientSchema } from "@/validators/recipe/ingredient.validator";
import { z } from "zod";

export const CreateRecipeSchema = z.object({
  title: z.coerce.string().min(1, "Cannot be empty."),
  picture: z.coerce.string().url().optional(),
  category: z.coerce.string(),
  tags: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().optional(),
  preparationTime: z.coerce.string().nullable(),
  cookingTime: z.coerce.string().nullable(),
  ovenTemperature: z.coerce.string().nullable(),
  ingredients: z.array(IngredientSchema),
  preparation: z.coerce.string().nullable(),
});
