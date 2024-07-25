import { z } from "zod";
import { IngredientSchema } from "./ingredient.validator";
import { CategorySchema } from "../category";
import { TagSchema } from "../tag";

export const RecipeSchema = z.object({
  id: z.coerce.string().min(1, "Cannot be empty."),
  title: z.coerce.string().min(1, "Cannot be empty."),
  category: z.coerce.string(),
  tags: z.array(z.coerce.string().nullable()),
  numberOfPersons: z.coerce.number().optional(),
  preparationTime: z.coerce.string().nullable(),
  cookingTime: z.coerce.string().nullable(),
  ovenTemperature: z.coerce.string().nullable(),
  ingredients: z.array(IngredientSchema),
  preparation: z.coerce.string().nullable(),
  pinned: z.boolean(),
  created_at: z.date().optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const RecipePopulatedSchema = RecipeSchema.omit({
  tags: true,
  category: true,
}).merge(
  z.object({
    category: CategorySchema,
    tags: z.array(TagSchema),
  }),
);

export type RecipePopulated = z.infer<typeof RecipePopulatedSchema>;
