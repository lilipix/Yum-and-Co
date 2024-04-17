import { z } from 'zod';

export const LabelValidator = z.object({
    id: z.coerce.string().min(1, 'Cannot be empty.'),
    name: z.coerce.string().min(1, 'Cannot be empty.'),
});

export type ILabel = z.infer<typeof LabelValidator>;