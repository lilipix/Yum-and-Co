import { PopulateOptions } from "mongoose";

export const populateRecipe: PopulateOptions[] = [
  { path: "category", select: "id name" },
  { path: "tags", select: "ide name color" },
];
