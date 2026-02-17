import { PopulateOptions } from "mongoose";

export const populateRecipe: PopulateOptions[] = [
  { path: "category", select: "_id name" },
  { path: "tags", select: "_id name color" },
];
