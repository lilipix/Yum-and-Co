import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.coerce.string().min(1, "Cannot be empty."),
});
