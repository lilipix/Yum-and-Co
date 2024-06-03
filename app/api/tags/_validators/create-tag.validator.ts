import { ColorPalette } from '@/validators/tag';
import { z } from 'zod';

export const CreateTagSchema = z.object({
    name: z.string().min(1, "Cannot be empty."),
    color: z.nativeEnum(ColorPalette),  
});