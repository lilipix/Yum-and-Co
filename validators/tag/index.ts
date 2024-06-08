import { badgeVariants } from '@/components/ui/badge';
import { colorTelltaleVariants } from '@/components/ui/colorTelltale';
import { VariantProps } from 'class-variance-authority';
import { z } from "zod";

export type Variant = 'default' | 'destructive' | 'secondary' | 'warning' | 'success' | 'info' | 'pinklight' | 'pinkdark' | 'outline' | null | undefined;
export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']
export type ColorTelltaleVariant = VariantProps<typeof colorTelltaleVariants>['variant']

export enum ColorPalette{
    DEFAULT = 'default',
    SECONDARY = 'secondary',
    DESTRUCTIVE = 'destructive',
    SUCCESS = 'success',
    WARNING = 'warning',
    PINKLIGHT = 'pinklight',
    PURPLE = 'purple',
    OUTLINE= 'outline',
    INFO = 'info',
}

export const TagSchema = z.object({
  id: z.coerce.string(),
  name: z.coerce.string(),
  color: z.nativeEnum(ColorPalette).optional(),
});

export const TagsSchema = z.array(TagSchema); 
 
export type Tag = z.infer<typeof TagSchema>;
