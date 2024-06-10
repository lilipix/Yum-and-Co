import { ColorPalette } from "@/validators/tag";
import { z } from "zod";

export const updateTagSchema = z.object({
  name: z.string(),
  color: z.nativeEnum(ColorPalette).optional(),
});
