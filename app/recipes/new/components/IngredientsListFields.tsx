import { nullable, z } from "zod";
import { Form, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  IngredientSchema,
  Unit,
  getUnitLabel,
} from "@/validators/recipe/ingredient.validator";

export const IngredientsListFieldsSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z
        .string()
        .nullable()
        .transform((value) => (value ? value.toLowerCase() : null)),
      baseQuantity: z.coerce.number().optional(),
      unit: z.nativeEnum(Unit).optional(),
    }),
  ),
});

export type IngredientsListFieldsValues = z.infer<
  typeof IngredientsListFieldsSchema
>;

const IngredientsListFields = () => {
  const form = useFormContext<IngredientsListFieldsValues>();

  const { fields, insert, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const units = Object.values(Unit).map((unit) => ({
    key: unit,
    value: unit,
    label: getUnitLabel(unit),
  }));

  const handleAddIngredients = () => {
    insert(fields.length, {
      name: "",
      baseQuantity: undefined,
      unit: Unit.GRAM,
    });
  };

  const handleDeleteIngredients = (index: number) => () => remove(index);
  return (
    <div className="flex flex-col flex-wrap gap-4">
      {fields.map((fieldItem, index) => (
        <div key={fieldItem.id}>
          <div className="justify-between gap-4 xl:flex">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name={`ingredients.${index}.baseQuantity`}
                render={({ field }) => (
                  <FormItem className="w-1/2 flex-1 ">
                    <FormLabel>Quantité</FormLabel>
                    <FormControl>
                      <Input type="number" defaultValue={field.value} placeholder="Ex : 400" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-1/2 xl:w-28">
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.unit`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Unité</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="g" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex : Farine"
                        type="text"
                        {...field}
                        value={field.value?.toLowerCase() ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-8 flex w-fit justify-end">
                <Button
                  className="w-fit items-center"
                  variant="secondary"
                  onClick={handleDeleteIngredients(index)}
                >
                  <Trash size="16" className="text-destructive" />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="mt-4 xl:hidden" />
        </div>
      ))}
      <Button
        className="flex items-center justify-between"
        type="button"
        variant="secondary"
        onClick={handleAddIngredients}
      >
        Ajouter un ingrédient
        <Plus size="16" />
      </Button>
    </div>
  );
};

export default IngredientsListFields;
