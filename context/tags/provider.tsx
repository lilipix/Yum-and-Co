"use client";

import { updateTagSchema } from "@/app/api/tags/_validators/update-tag.validator";
import { Tag } from "@/validators/tag";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { z } from "zod";
import { updateTag as updateTagRequest } from "@/services/tags.service";
import TagsContext, { TagsContextValue } from ".";

type TagsProviderProps = {
  children: ReactNode;
  tags?: Tag[] | null;
};

const TagsProvider = ({
  tags: initialTags = [],
  children,
}: TagsProviderProps) => {
  const [isMutating, setIsMutating] = useState(false);
  const { data, error, isLoading, mutate } = useSWR<Tag[] | null>(
    "/api/tags/",
    {
      fallbackData: initialTags,
    },
  );

  const updateTag = useCallback(
    async (tag: z.infer<typeof updateTagSchema>) => {
      try {
        if (!data || data.length !== 1) {
          toast.error(
            "La modification n'est autorisée que lorsqu'un seul tag est présent.",
          );
          return null;
        }
        setIsMutating(true);
        const updatedTag = await updateTagRequest(tag);
        await mutate(
          data.map((t) => (t.id === updatedTag.id ? updatedTag : t)),
        );
        return updatedTag;
      } catch (error) {
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contextValue: TagsContextValue = useMemo(
    () => ({
      tags: data,
      updateTag,
      isMutating,
      error,
      isLoading,
      refetchTags: mutate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isMutating, error, isLoading, updateTag],
  );

  return (
    <TagsContext.Provider value={contextValue}>{children}</TagsContext.Provider>
  );
};

export default TagsProvider;
