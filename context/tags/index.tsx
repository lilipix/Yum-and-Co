"use client";

import { updateTagSchema } from "@/app/api/tags/_validators/update-tag.validator";
import { Tag } from "@/validators/tag";
import React, { createContext } from "react";
import { z } from "zod";
import { KeyedMutator } from "swr";

export type TagsContextValue = {
  tags?: Tag[] | null;
  isLoading: boolean;
  isMutating: boolean;
  error: Error | null;
  updateTag: (tag: z.infer<typeof updateTagSchema>) => Promise<Tag | null>;
  deleteTags: () => Promise<Tag[] | null>;
  refetchTags: KeyedMutator<Tag[] | null>;
};

const TagsContext = React.createContext<TagsContextValue | null>(null);

export default TagsContext;
