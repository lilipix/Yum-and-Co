import { z } from "zod";

export enum ColorPalette{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DESTRUCTIVE = 'destructive',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    PINKLIGHT = 'pinklight',
    PINKDARK = 'pinkDark',
}

export const TagSchema = z.object({
  id: z.coerce.string().min(1, "Cannot be empty."),
  name: z.coerce.string().min(1, "Cannot be empty."),
  color: z.nativeEnum(ColorPalette),
});

export type Tag = z.infer<typeof TagSchema>;
