import { z } from "zod";

export const TagSchema = z.object({
  id: z.coerce.string().min(1, "Cannot be empty."),
  name: z.coerce.string().min(1, "Cannot be empty."),
});

export type Tag = z.infer<typeof TagSchema>;
