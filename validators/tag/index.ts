import { badgeVariants } from "@/components/ui/badge";
import { colorTelltaleVariants } from "@/components/ui/custom/colorTelltale";
import { VariantProps } from "class-variance-authority";
import { z } from "zod";

export type Variant =
  | "default"
  | "destructive"
  | "secondary"
  | "warning"
  | "success"
  | "info"
  | "purple"
  | "pinkdark"
  | "outline"
  | "pinklight"
  | "orange"
  | null
  | undefined;
export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
export type ColorTelltaleVariant = VariantProps<
  typeof colorTelltaleVariants
>["variant"];

export enum ColorPalette {
  DEFAULT = "default",
  SECONDARY = "secondary",
  DESTRUCTIVE = "destructive",
  SUCCESS = "success",
  WARNING = "warning",
  PINKDARK = "pinkdark",
  PURPLE = "purple",
  OUTLINE = "outline",
  INFO = "info",
  PINKLIGHT = "pinklight",
  ORANGE = "orange",
}

export const TagSchema = z.object({
  id: z.coerce.string(),
  name: z.coerce.string(),
  color: z.nativeEnum(ColorPalette).optional(),
});

export const TagsSchema = z.array(TagSchema);

export type Tag = z.infer<typeof TagSchema>;
