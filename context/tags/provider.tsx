"use client";

import { updateTagSchema } from "@/app/api/tags/_validators/update-tag.validator";
import { Tag } from "@/validators/tag";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR, { KeyedMutator } from "swr";
import { z } from "zod";
import {
  updateTag as updateTagRequest,
  deleteTag as deleteTagRequest,
} from "@/services/tags.service";
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
  const {
    data: tags = initialTags,
    error,
    isLoading,
    mutate,
  } = useSWR<Tag[] | null>("/api/tags/", {
    fallbackData: initialTags,
  });
  const updateTag = useCallback(
    async (tagIds: z.infer<typeof updateTagSchema>) => {
      try {
        setIsMutating(true);
        const updatedTag = await updateTagRequest(tagIds);
        await mutate(
          (currentData) =>
            currentData
              ? currentData.map((t) =>
                  t.id === updatedTag.id ? updatedTag : t,
                )
              : [updatedTag],
          false,
        );
        return updatedTag;
      } catch (error) {
        throw error;
      } finally {
        setIsMutating(false);
      }
    },
    [mutate],
  );

  const deleteTags = useCallback(
    async () => {
      if (!tags) {
        toast.error("Pas de tags trouvés. Merci d'en créer un.");
        return null;
      }
      setIsMutating(true);
      try {
        const deletedTag = await deleteTagRequest(tags.map((t) => t.id));
        await mutate(null);
        return deletedTag;
      } catch (error) {
        console.error(error);
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
      tags,
      updateTag,
      deleteTags,
      isMutating,
      error,
      isLoading,
      refetchTags: mutate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tags, isMutating, error, isLoading, updateTag, deleteTags, mutate],
  );

  return (
    <TagsContext.Provider value={contextValue}>{children}</TagsContext.Provider>
  );
};

export default TagsProvider;
