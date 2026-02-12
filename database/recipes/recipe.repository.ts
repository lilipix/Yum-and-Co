import connectToDatabase from "@/lib/mongodb";
import { CreateRecipeDTO, UpdateRecipeDTO } from "./recipe.dto";
import RecipeModel from "./recipe.model";
import { populateRecipe } from "./utils/populate-recipe";
import { Recipe, RecipePopulated } from "@/validators/recipe";
import { ObjectId } from "mongoose";

// function convertToRecipeData(document: any): RecipePopulated {
//   const recipeData = document.toJSON({
//     flattenObjectIds: true,
//     versionKey: false,
//   }) as unknown as RecipePopulated;
//   return formatRecipeData(recipeData);
// }

// function formatRecipeData(recipeData: RecipePopulated): RecipePopulated {
//   recipeData.category = populateCategory(
//     recipeData.category as ObjectId | { name: string; id: string },
//   );
//   return recipeData;
// }

// export const findRecipes = async (): Promise<RecipePopulated[]> => {
//   try {
//     const documents = await RecipeModel.find().populate(populateRecipe);
//     return documents.map(
//       (document) =>
//         document.toJSON({
//           //serialized ObjectId to string
//           flattenObjectIds: true,
//           //__v non-inclusion
//           versionKey: false,
//         }) as RecipePopulated,
//     );
//   } catch (error) {
//     throw new Error("Failed to find recipes");
//   }
// };

export const findRecipes = async (): Promise<RecipePopulated[]> => {
  try {
    const documents = await RecipeModel.find()
      .populate(populateRecipe)
      .lean<RecipePopulated>();
    console.log("Documents trouvés :", documents);
    const populatedDocuments = documents.map(
      (document) =>
        document.toJSON({
          flattenObjectIds: true,
          versionKey: false,
        }) as RecipePopulated,
    );

    console.log(populatedDocuments); // Ajoutez ceci pour vérifier la structure des documents

    return populatedDocuments;
  } catch (error) {
    throw new Error("Failed to find recipes");
  }
};

// export const findRecipes = async (): Promise<Recipe[]> => {
//   try {
//     const documents = await RecipeModel.find();
//     return documents.map((document) => {
//       const jsonDocument = document.toJSON({
//         //serialized ObjectId to string
//         flattenObjectIds: true,
//         //__v non-inclusion
//         versionKey: false,
//       });
//       // Transformer explicitement l'ObjectId 'category' en string
//       if (jsonDocument.category instanceof ObjectId) {
//         jsonDocument.category = jsonDocument.category.toString();
//       }
//       return jsonDocument;
//     });
//   } catch (error) {
//     throw new Error("Failed to find recipes");
//   }
// };

// function populateCategory(category: ObjectId | { name: string; id: string }): {
//   name: string;
//   id: string;
// } {
//   // Si category est déjà un objet peuplé, on le retourne tel quel
//   if (typeof category === "object" && "name" in category && "id" in category) {
//     return category;
//   }

//   // Sinon, on doit convertir l'ObjectId
//   return { name: "Nom par défaut", id: category.toString() };
// }

export const createRecipe = async (
  data: CreateRecipeDTO,
): Promise<RecipePopulated> => {
  try {
    const document = await RecipeModel.create(data);

    const populatedRecipe = await document.populate(populateRecipe);

    const recipeData = populatedRecipe.toJSON() as unknown as RecipePopulated;

    recipeData.category = populateCategory(
      recipeData.category as unknown as { name: string; id: string },
    );

    return recipeData as unknown as RecipePopulated;
  } catch (error) {
    console.error("Failed to create recipe", error);
    throw error;
  }
};

export const findRecipeByTitle = async (title: string) => {
  try {
    return await RecipeModel.findOne({ title });
  } catch (error) {
    throw new Error("Failed to find recipe");
  }
};

export const findRecipeById = async (
  id: string,
): Promise<RecipePopulated | null> => {
  console.log("REPO>>>>>", id);
  try {
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
  } catch (error) {
    console.error("Failed to find recipe by id", error);
    throw error;
  }
};

export const findRecipesByCategories = async (
  categoryId: string,
): Promise<RecipePopulated[]> => {
  try {
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
  } catch (error) {
    throw new Error("Failed to find recipes by category");
  }
};

export const findRecipesByTags = async (
  tagIds: string[],
): Promise<RecipePopulated[]> => {
  try {
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
  } catch (error) {
    throw new Error("Failed to find recipe by categories");
  }
};

export const findPinnedRecipes = async (): Promise<RecipePopulated[]> => {
  try {
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
  } catch (error) {
    throw new Error("Failed to find pinned recipes");
  }
};

export const findLatestRecipesAdded = async (): Promise<RecipePopulated[]> => {
  try {
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
  } catch (error) {
    throw new Error("Failed to find latest recipes added");
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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update recipe");
  }
};

export const deleteRecipe = async (id: string): Promise<RecipePopulated> => {
  try {
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
