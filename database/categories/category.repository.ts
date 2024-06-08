import { ICategory } from "@/validators/category";
import CategoryModel from "./category.model";
import { CreateCategoryDTO } from "./category.dto";
import connectToDatabase from "@/lib/mongodb";

export const createCategory = async (
  data: CreateCategoryDTO
): Promise<ICategory> => {
  try {
    await connectToDatabase();
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


export const findCategories = async (): Promise<ICategory[]> => {
  try {
    await connectToDatabase();
    const documents = await CategoryModel.find();
    return documents.map((document) => document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
  }));
  } catch (error) {
    throw error;
  }
}