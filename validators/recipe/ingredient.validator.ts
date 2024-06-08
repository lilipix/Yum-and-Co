import { z } from "zod";

export enum Unit {
  GRAM = "g",
  KILOGRAM = "kg",
  LITER = "l",
  CENTILITER = "cl",
  DECILITER = "dl",
  MILLILITER = "ml",
  UNIT = "unit",
  CUP = "cup",
  TABLESPOON = "tbsp",
  TEASPOON = "tsp",
  SMALLAMOUNT = "smallamount",
  PINCH = "pinch",
}

export const UnitSchema = z.nativeEnum(Unit).nullable().optional();

export const UnitLabels = {
  [Unit.GRAM]: "g",
  [Unit.KILOGRAM]: "kg",
  [Unit.LITER]: "l",
  [Unit.CENTILITER]: "cl",
  [Unit.DECILITER]: "dl",
  [Unit.MILLILITER]: "ml",
  [Unit.UNIT]: "unité(s)",
  [Unit.CUP]: "cup",
  [Unit.TABLESPOON]: "càs",
  [Unit.TEASPOON]: "càc",
  [Unit.SMALLAMOUNT]: "noisette(s)",
  [Unit.PINCH]: "pincée(s)",
};

export const getUnitLabel = (unit: Unit) => {
  return UnitLabels[unit];
};

export const IngredientSchema = z.object({
  name: z.string().nullable(),
  baseQuantity: z.coerce.number().optional(),
  unit: z.nativeEnum(Unit).nullable().optional(),
});

export interface IIngredient extends z.infer<typeof IngredientSchema> {}
