import { TagSchema } from "@/validators/tag";
import { z } from "zod";

export const CreateTagSchemaDTO = TagSchema.omit({
  id: true,
});

export type CreateTagDTO = z.infer<typeof CreateTagSchemaDTO>;

export const UpdateTagSchemaDTO = TagSchema;

export type UpdateTagDTO = z.infer<typeof UpdateTagSchemaDTO>;
