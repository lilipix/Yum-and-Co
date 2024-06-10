import { ICategory } from "@/validators/category";
import CategoryModel from "./category.model";
import { CreateCategoryDTO } from "./category.dto";
import connectToDatabase from "@/lib/mongodb";
import { error } from "console";

export const createCategory = async (
  data: CreateCategoryDTO,
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

// export const findCategories = async (): Promise<ICategory[]| string> => {
//   try {
//     await connectToDatabase();
//     const documents = await CategoryModel.find();
//     if(documents.length === 0) {
//       return "Ajoutez une première recette pour afficher une catégorie";
//     }
//     return documents.map((document) => document.toJSON({
//       //serialized ObjectId to string
//       flattenObjectIds: true,
//       //__v non-inclusion
//       versionKey: false,
//   }));
//   } catch (error) {
//     throw error;
//   }
// }

export const findCategories = async (): Promise<ICategory[]> => {
  try {
    await connectToDatabase();
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

export const findCategoryById = async (id: string): Promise<ICategory> => {
  try {
    await connectToDatabase();
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
