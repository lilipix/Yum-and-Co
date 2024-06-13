import { z } from "zod";

export const CategorySchema = z.object({
  id: z.coerce.string().min(1, "Cannot be empty."),
  name: z.coerce.string().min(1, "Cannot be empty."),
});

export const CategoriesSchema = z.array(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;
