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

export const IngredientsListFormSchema = z.object({
  ingredients: z.array(IngredientSchema),
});

export type IngredientsListFormValues = z.infer<
  typeof IngredientsListFormSchema
>;

const IngredientsListForm = () => {
  const form = useFormContext<IngredientsListFormValues>();

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
          <div className="gap-4 md:flex">
            <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name={`ingredients.${index}.baseQuantity`}
                  render={({ field }) => (
                    <FormItem className="flex-1 w-1/2 ">
                      <FormLabel>Quantité</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <div className="w-1/2 md:w-28">
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
                          <SelectValue placeholder="" />
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
                        placeholder=""
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-8 w-fit">
                <Button
                  className="items-center w-fit"
                  variant="secondary"
                  onClick={handleDeleteIngredients(index)}
                >
                  <Trash size="16" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button
        className="items-center flex justify-between"
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

export default IngredientsListForm;
