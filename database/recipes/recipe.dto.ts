import { RecipeSchema } from "@/validators/recipe";
import { z } from "zod";

export const CreateRecipeSchemaDTO = RecipeSchema.omit({
  id: true,
});

export type CreateRecipeDTO = z.infer<typeof CreateRecipeSchemaDTO>;

export const UpdateRecipeSchemaDTO = RecipeSchema;

export type UpdateRecipeDTO = z.infer<typeof UpdateRecipeSchemaDTO>;
