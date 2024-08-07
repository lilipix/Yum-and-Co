import { Category } from "@/validators/category";
import CategoryModel from "./category.model";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";
import connectToDatabase from "@/lib/mongodb";
import { error } from "console";

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

export const updateCategory = async (
  id: string,
  data: UpdateCategoryDTO,
): Promise<Category> => {
  try {
    const document = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true },
    );
    if (!document) {
      throw new Error("Category not found");
    }
    return document.toJSON({
      flattenObjectIds: true,
      versionKey: false,
    });
  } catch (error) {
    throw new Error("Failed to update category");
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
