import useTagCreate from "@/hooks/useTagCreate";
import { ColorPalette, Tag } from "@/validators/tag";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CreateSelect from "@/app/(app)/recipes/components/Select/CreateSelect";
import { z } from "zod";

export const RecipeTagsSelectFieldSchema = z.object({
  tags: z.array(z.string()),
});

export type RecipeTagsSelectFieldValues = z.infer<
  typeof RecipeTagsSelectFieldSchema
>;

type RecipeTagsSelectFieldProps = {
  tags: Tag[];
  allowMultiple?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  enableColors?: boolean;
  label?: ReactNode;
};

const RecipeTagsSelectField = ({
  tags: initialTags,
  isDisabled = false,
  allowMultiple = true,
  enableColors = true,
  label = "Tags",
}: RecipeTagsSelectFieldProps) => {
  const form = useFormContext<RecipeTagsSelectFieldValues>();

  const {
    tags,
    isLoading,
    createTag: handleCreateTag,
    updateTag: handleUpdateTag,
  } = useTagCreate(initialTags);

  const tagsOptions = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    color: tag.color,
  }));
  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => {
        const handleChange = (value: string | string[]) => {
          field.onChange(value);
        };
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <CreateSelect
              allowMultiple={allowMultiple}
              disabled={isDisabled}
              isLoading={isLoading}
              options={tagsOptions}
              enableColors={enableColors}
              value={field.value}
              onCreateOption={handleCreateTag}
              onUpdateOption={handleUpdateTag}
              onSelect={handleChange}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RecipeTagsSelectField;
