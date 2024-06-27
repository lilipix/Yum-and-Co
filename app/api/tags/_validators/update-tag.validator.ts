import { ColorPalette } from "@/validators/tag";
import { z } from "zod";

export const updateTagSchema = z.object({
  id: z.string().min(1, "Cannot be empty."),
  name: z.string(),
  color: z.nativeEnum(ColorPalette).optional(),
});
