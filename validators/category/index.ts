import { z } from "zod";

export const CategorySchema = z.object({
  id: z.coerce.string().min(1, "Cannot be empty."),
  name: z.coerce.string().min(1, "Cannot be empty."),
});

export type ICategory = z.infer<typeof CategorySchema>;
