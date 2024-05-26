import { z } from "zod";
import { IngredientSchema } from "./ingredient.validator";
import { CategorySchema } from "../category";
import { LabelSchema } from "../label";

export const RecipeSchema = z.object({
  id: z.coerce.string().min(1, "Cannot be empty."),
  title: z.coerce.string().min(1, "Cannot be empty."),
  category: z.coerce.string(),
  labels: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().optional(),
  preparationTime: z.coerce.string().nullable(),
  cookingTime: z.coerce.string().nullable(),
  ovenTemperature: z.coerce.string().nullable(),
  ingredients: z.array(IngredientSchema),
  preparation: z.coerce.string().nullable(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const RecipePopulatedSchema = RecipeSchema.omit({
  labels: true,
  category: true,
}).merge(
  z.object({
    category: CategorySchema,
    labels: z.array(LabelSchema),
  }),
);

export type RecipePopulated = z.infer<typeof RecipePopulatedSchema>;
