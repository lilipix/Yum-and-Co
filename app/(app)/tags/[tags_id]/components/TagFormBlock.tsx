import { ColorTelltale } from "@/components/ui/custom/colorTelltale";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPalette } from "@/validators/tag";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const TagFormBlockSchema = z.object({
  name: z.string().min(1, "Requis"),
  color: z.nativeEnum(ColorPalette).optional(),
});

export type TagFormBlockValues = z.infer<typeof TagFormBlockSchema>;

const TagFormBlock = () => {
  const form = useFormContext<TagFormBlockValues>();
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du tag</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="color"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Couleur du tag</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(ColorPalette).map((color) => (
                  <SelectItem
                    className="!flex !flex-row items-center gap-2"
                    key={color}
                    value={color}
                  >
                    <ColorTelltale variant={color} />
                    <div className="capitalize">
                      {color === ColorPalette.DEFAULT ? "Primary" : color}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default TagFormBlock;
