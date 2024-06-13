import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const CategoryFormBlockSchema = z.object({
  name: z.string().min(1, "Requis"),
});

export type CategoryFormBlockValues = z.infer<typeof CategoryFormBlockSchema>;

const CategoryFormBlock = () => {
  const form = useFormContext<CategoryFormBlockValues>();
  return (
    <div>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de la catégorie</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CategoryFormBlock;
