import { Category } from "@/validators/category";
import CategoryModel from "./category.model";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";
import connectToDatabase from "@/lib/mongodb";
import { error } from "console";
import { Types } from "mongoose";

export type Id = Types.ObjectId;
export const newId = <T extends string | Id | null | undefined>(
  idString?: T,
): T extends null ? null : Id => {
  if (typeof idString === "undefined" || idString === undefined) {
    return new Types.ObjectId() as T extends null ? null : Id;
  }
  if (idString === null) {
    return null as T extends null ? null : Id;
  }
  if (typeof idString === "string" && idString.length === 0) {
    throw new Error(
      "Error at newId: cannot create a new id from an empty string.",
    );
  }
  return new Types.ObjectId(idString) as T extends null ? null : Id;
};

export const createCategory = async (
  data: CreateCategoryDTO,
): Promise<Category> => {
  try {
    const document = await CategoryModel.create(data);
    return document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    });
  } catch (error) {
    throw error;
  }
};

export const findCategories = async (): Promise<Category[]> => {
  try {
    const documents = await CategoryModel.find();
    if (documents.length === 0) {
      return [];
    }
    return documents.map((document) =>
      document.toJSON({
        //serialized ObjectId to string
        flattenObjectIds: true,
        //__v non-inclusion
        versionKey: false,
      }),
    );
  } catch (error) {
    throw error;
  }
};

export const findCategoryById = async (id: string): Promise<Category> => {
  try {
    const document = await CategoryModel.findById(id);
    return document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    });
  } catch (error) {
    throw new Error("Failed to find category by id");
  }
};

// export const updateCategory = async (
//   id: string,
//   data: { name: string },
// ): Promise<Category> => {
//   try {
//     console.log("repository");
//     console.log("repo", data);
//     const document = await CategoryModel.findByIdAndUpdate(
//       id,
//       { $set: { ...data } },
//       { new: true },
//     );
//     if (!document) {
//       console.error("Category not found");
//       throw new Error("Category not found");
//     }
//     console.log("Document updated:", document);
//     return document.toJSON({
//       flattenObjectIds: true,
//       versionKey: false,
//     });
//   } catch (error) {
//     console.error("Error in updateCategory:", error);
//     throw new Error("Failed to update category");
//   }
// };

export const updateCategory = async (
  data: UpdateCategoryDTO,
): Promise<Category | null> => {
  try {
    console.log("Entering updateCategory function");
    console.log("Data to update:", data);

    const document = await CategoryModel.findByIdAndUpdate(
      newId(data.id),
      { $set: { ...data } },
      { new: true },
    );

    if (!document) {
      console.error("Category not found");
      throw new Error("Category not found");
    }

    console.log("Document updated successfully:", document);
    return document.toJSON({
      flattenObjectIds: true,
      versionKey: false,
    });
  } catch (error: unknown) {
    console.error("Error in updateCategory:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update category: ${error.message}`);
    } else {
      throw new Error("Failed to update category: Unknown error");
    }
  }
};

export const deleteCategory = async (id: string): Promise<Category> => {
  try {
    const document = await CategoryModel.findByIdAndDelete(id);
    if (!document) {
      throw new Error("Category not found");
    }
    return document.toJSON({
      flattenObjectIds: true,
      versionKey: false,
    });
  } catch (error) {
    throw Error("Failed to delete category");
  }
};
