import connectToDatabase from "@/lib/mongodb";
import { CreateRecipeDTO } from "./recipe.dto";
import RecipeModel from "./recipe.model";
import { populateRecipe } from "./utils/populate-recipe";
import { RecipePopulated } from "@/validators/recipe";

export const createRecipe = async (
  data: CreateRecipeDTO,
): Promise<RecipePopulated> => {
  try {
    await connectToDatabase();
    const document = await RecipeModel.create(data);

    const populatedRecipe = await document.populate(populateRecipe);

    return populatedRecipe.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    });
  } catch (error) {
    console.error("Failed to create recipe", error);
    throw error;
  }
};

export const findRecipeByTitle = async (title: string) => {
  try {
    await connectToDatabase();
    return await RecipeModel.findOne({ title });
  } catch (error) {
    throw new Error("Failed to find recipe");
  }
};
