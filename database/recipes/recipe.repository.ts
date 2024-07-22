import connectToDatabase from "@/lib/mongodb";
import { CreateRecipeDTO, UpdateRecipeDTO } from "./recipe.dto";
import RecipeModel from "./recipe.model";
import { populateRecipe } from "./utils/populate-recipe";
import { Recipe, RecipePopulated } from "@/validators/recipe";
import { boolean } from "zod";

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

export const findRecipes = async (): Promise<Recipe[]> => {
  try {
    await connectToDatabase();
    const documents = await RecipeModel.find();
    return documents.map((document) =>
      document.toJSON({
        //serialized ObjectId to string
        flattenObjectIds: true,
        //__v non-inclusion
        versionKey: false,
      }),
    );
  } catch (error) {
    throw new Error("Failed to find recipes");
  }
};

export const findRecipeById = async (
  id: string,
): Promise<RecipePopulated | null> => {
  try {
    const document = await RecipeModel.findById(id).populate(populateRecipe);

    if (!document) {
      throw new Error("Recipe not found");
    }
    return (
      document.toJSON({
        //serialized ObjectId to string
        flattenObjectIds: true,
        //__v non-inclusion
        versionKey: false,
      }) || null
    );
  } catch (error) {
    throw new Error("Failed to find category by id");
  }
};

export const findRecipesByCategories = async (
  category: string,
): Promise<RecipePopulated[]> => {
  try {
    const documents = await RecipeModel.find({ category }).populate(
      populateRecipe,
    );
    return documents.map((document) =>
      document.toJSON({
        //serialized ObjectId to string
        flattenObjectIds: true,
        //__v non-inclusion
        versionKey: false,
      }),
    );
  } catch (error) {
    throw new Error("Failed to find recipe by categories");
  }
};

export const findRecipesByTag = async (
  tagId: string,
): Promise<RecipePopulated[]> => {
  try {
    const documents = await RecipeModel.find({ tags: tagId }).populate(
      populateRecipe,
    );
    return documents.map((document) =>
      document.toJSON({
        //serialized ObjectId to string
        flattenObjectIds: true,
        //__v non-inclusion
        versionKey: false,
      }),
    );
  } catch (error) {
    throw new Error("Failed to find recipe by categories");
  }
};

export const findRecipesByTags = async (
  tagIds: string[],
): Promise<RecipePopulated[]> => {
  try {
    const documents = await RecipeModel.find({
      tags: { $all: tagIds },
    }).populate(populateRecipe);
    return documents.map((document) =>
      document.toJSON({
        //serialized ObjectId to string
        flattenObjectIds: true,
        //__v non-inclusion
        versionKey: false,
      }),
    );
  } catch (error) {
    throw new Error("Failed to find recipe by categories");
  }
};

export const updateRecipe = async (
  data: UpdateRecipeDTO,
): Promise<RecipePopulated | null> => {
  if (!data.id) {
    throw new Error("No recipe ID provided");
  }
  try {
    const document = await RecipeModel.findByIdAndUpdate(
      data.id,
      { $set: { ...data } },
      { new: true },
    ).populate(populateRecipe);
    if (!document) {
      throw new Error("Recipe not found");
    }
    return document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    });
  } catch (error) {
    throw new Error("Failed to update recipe");
  }
};

export const deleteRecipe = async (id: string): Promise<RecipePopulated> => {
  try {
    const document = await RecipeModel.findByIdAndDelete(id);
    if (!document) {
      throw new Error("Recipe not found");
    }
    return document.toJSON({
      flattenObjectIds: true,
      versionKey: false,
    });
  } catch (error) {
    throw Error("Failed to delete recipe");
  }
};

export const toggleRecipePin = async (recipeId: string, shouldPin: boolean) => {
  try {
    const result = await RecipeModel.findByIdAndUpdate(
      recipeId,
      { $set: { pinned: shouldPin } },
      { new: true },
    );
    return result;
  } catch (error) {
    throw new Error("Error updating recipe status");
  }
};
