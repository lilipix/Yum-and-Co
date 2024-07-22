import { RecipeSchema } from "@/validators/recipe";
import { z } from "zod";

export const CreateRecipeSchemaDTO = RecipeSchema.omit({
  id: true,
  pinned: true,
});

export type CreateRecipeDTO = z.infer<typeof CreateRecipeSchemaDTO>;

export const UpdateRecipeSchemaDTO = RecipeSchema.omit({ pinned: true });

export type UpdateRecipeDTO = z.infer<typeof UpdateRecipeSchemaDTO>;
