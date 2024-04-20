import { IngredientSchema } from "@/validators/recipe/ingredient.validator";
import { z } from "zod";

export const CreateRecipeSchema = z.object({
  title: z.coerce.string().min(1, "Cannot be empty."),
  category: z.coerce.string(),
  labels: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().nullable(),
  preparationTime: z.coerce.string().nullable(),
  cookingTime: z.coerce.string().nullable(),
  ovenTemperature: z.coerce.string().nullable(),
  ingredients: z.array(IngredientSchema),
  preparation: z.coerce.string().nullable(),
});
