import { z } from 'zod';

export const LabelSchema = z.object({
    id: z.coerce.string().min(1, 'Cannot be empty.').optional(),
    name: z.coerce.string().min(1, 'Cannot be empty.'),
});

export type ILabel = z.infer<typeof LabelSchema>;