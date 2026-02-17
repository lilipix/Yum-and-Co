import connectToDatabase from "@/lib/mongodb";
import { CreateRecipeDTO, UpdateRecipeDTO } from "./recipe.dto";
import RecipeModel from "./recipe.model";
import { populateRecipe } from "./utils/populate-recipe";
import { Recipe, RecipePopulated } from "@/validators/recipe";
import { ObjectId } from "mongoose"; // Ajoutez ceci pour vérifier la structure des documents

export const findRecipes = async (): Promise<Recipe[]> => {
  const documents = await RecipeModel.find().lean();

  return documents.map((doc: any) => ({
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category?.toString(),
    tags: doc.tags?.map((tag: any) => tag?.toString()),
    numberOfPersons: doc.numberOfPersons,
    preparationTime: doc.preparationTime,
    cookingTime: doc.cookingTime,
    ovenTemperature: doc.ovenTemperature,
    preparation: doc.preparation,
    pinned: doc.pinned,
    picture: doc.picture,
    ingredients: doc.ingredients?.map((ingredient: any) => ({
      id: ingredient._id.toString(),
      name: ingredient.name,
      baseQuantity: ingredient.baseQuantity,
      unit: ingredient.unit,
    })),
  }));
};

export const findRecipesPopulated = async (): Promise<RecipePopulated[]> => {
  return RecipeModel.find().populate(populateRecipe).lean<RecipePopulated[]>();
};

function populateCategory(category: ObjectId | { name: string; id: string }): {
  name: string;
  id: string;
} {
  // Si category est déjà un objet peuplé, on le retourne tel quel
  if (typeof category === "object" && "name" in category && "id" in category) {
    return category;
  }

  // Sinon, on doit convertir l'ObjectId
  return { name: "Nom par défaut", id: category.toString() };
}

export const createRecipe = async (
  data: CreateRecipeDTO,
): Promise<RecipePopulated> => {
  const document = await RecipeModel.create(data);

  const populatedRecipe = await document.populate(populateRecipe);

  const recipeData = populatedRecipe.toJSON() as unknown as RecipePopulated;

  recipeData.category = populateCategory(
    recipeData.category as unknown as { name: string; id: string },
  );

  return recipeData as unknown as RecipePopulated;
};

export const findRecipeByTitle = async (title: string) => {
  return await RecipeModel.findOne({ title });
};

export const findRecipeById = async (
  id: string,
): Promise<RecipePopulated | null> => {
  const document = await RecipeModel.findById(id).populate(populateRecipe);

  if (!document) {
    throw new Error("Recipe not found");
  }
  const recipeData = document.toJSON({
    //serialized ObjectId to string
    flattenObjectIds: true,
    //__v non-inclusion
    versionKey: false,
  }) as unknown as RecipePopulated;

  recipeData.category = populateCategory(
    recipeData.category as unknown as { name: string; id: string },
  );
  return recipeData || null;
};

export const findRecipesByCategories = async (
  categoryId: string,
): Promise<RecipePopulated[]> => {
  const documents = await RecipeModel.find({
    category: categoryId,
  }).populate(populateRecipe);
  return documents.map((document) => {
    const recipeData = document.toJSON({
      flattenObjectIds: true,
      versionKey: false,
    }) as unknown as RecipePopulated;

    if (
      typeof recipeData.category === "object" &&
      "name" in recipeData.category &&
      "id" in recipeData.category
    ) {
      recipeData.category = populateCategory(
        recipeData.category as { name: string; id: string },
      );
    } else {
      recipeData.category = populateCategory(recipeData.category as ObjectId);
    }

    return recipeData;
  });
};

export const findRecipesByTags = async (
  tagIds: string[],
): Promise<RecipePopulated[]> => {
  const documents = await RecipeModel.find({
    tags: { $all: tagIds },
  }).populate(populateRecipe);
  return documents.map((document) => {
    const recipeData = document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    }) as unknown as RecipePopulated;

    if (
      typeof recipeData.category === "object" &&
      "name" in recipeData.category &&
      "id" in recipeData.category
    ) {
      recipeData.category = populateCategory(
        recipeData.category as { name: string; id: string },
      );
    } else {
      recipeData.category = populateCategory(recipeData.category as ObjectId);
    }

    return recipeData;
  });
};

export const findPinnedRecipes = async (): Promise<RecipePopulated[]> => {
  const documents = await RecipeModel.find({ pinned: true }).populate(
    populateRecipe,
  );
  return documents.map((document) => {
    const recipeData = document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    }) as unknown as RecipePopulated;

    if (
      typeof recipeData.category === "object" &&
      "name" in recipeData.category &&
      "id" in recipeData.category
    ) {
      recipeData.category = populateCategory(
        recipeData.category as { name: string; id: string },
      );
    } else {
      recipeData.category = populateCategory(recipeData.category as ObjectId);
    }

    return recipeData;
  });
};

export const findLatestRecipesAdded = async (): Promise<RecipePopulated[]> => {
  const documents = await RecipeModel.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate(populateRecipe);
  return documents.map((document) => {
    const recipeData = document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    }) as unknown as RecipePopulated;

    if (
      typeof recipeData.category === "object" &&
      "name" in recipeData.category &&
      "id" in recipeData.category
    ) {
      recipeData.category = populateCategory(
        recipeData.category as { name: string; id: string },
      );
    } else {
      recipeData.category = populateCategory(recipeData.category as ObjectId);
    }

    return recipeData;
  });
};

export const updateRecipe = async (
  data: UpdateRecipeDTO,
): Promise<RecipePopulated | null> => {
  if (!data.id) {
    throw new Error("No recipe ID provided");
  }
  const document = await RecipeModel.findByIdAndUpdate(
    data.id,
    { $set: { ...data } },
    { new: true },
  ).populate(populateRecipe);
  if (!document) {
    throw new Error("Recipe not found");
  }

  const recipeData = document.toJSON({
    //serialized ObjectId to string
    flattenObjectIds: true,
    //__v non-inclusion
    versionKey: false,
  }) as unknown as RecipePopulated;

  recipeData.category = populateCategory(
    recipeData.category as unknown as { name: string; id: string },
  );

  return recipeData;
};

export const deleteRecipe = async (id: string): Promise<RecipePopulated> => {
  const document = await RecipeModel.findByIdAndDelete(id);
  if (!document) {
    throw new Error("Recipe not found");
  }
  const recipeData = document.toJSON({
    flattenObjectIds: true,
    versionKey: false,
  }) as unknown as RecipePopulated;

  recipeData.category = populateCategory(
    recipeData.category as unknown as { name: string; id: string },
  );

  return recipeData;
};

export const toggleRecipePin = async (recipeId: string, shouldPin: boolean) => {
  const result = await RecipeModel.findByIdAndUpdate(
    recipeId,
    { $set: { pinned: shouldPin } },
    { new: true },
  );
  return result;
};
