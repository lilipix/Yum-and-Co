import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const RecipePreparationFieldSchema = z.object({
  preparation: z.coerce.string().optional().nullable(),
});

export type RecipePreparationFieldValues = z.infer<
  typeof RecipePreparationFieldSchema
>;

const RecipePreparationField = () => {
  const form = useFormContext<RecipePreparationFieldValues>();
  return (
    <div>
      <FormField
        control={form.control}
        name="preparation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Préparation</FormLabel>
            <FormControl>
              <Textarea
                className="h-[200px]"
                placeholder=""
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RecipePreparationField;
