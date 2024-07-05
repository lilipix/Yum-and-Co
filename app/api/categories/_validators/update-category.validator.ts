import { z } from "zod";

export const UpdateCategorySchema = z.object({
  // id: z.coerce.string().min(1, "Cannot be empty."),
  name: z.coerce.string().min(1, "Cannot be empty."),
});
