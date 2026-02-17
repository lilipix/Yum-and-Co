import { Tag } from "@/validators/tag";
import { CreateTagDTO, UpdateTagDTO } from "./tag.dto";
import connectToDatabase from "@/lib/mongodb";
import TagModel from "./tag.model";

export const createTag = async (data: CreateTagDTO): Promise<Tag> => {
  const document = await TagModel.create(data);
  return document.toJSON({
    //serialized ObjectId to string
    flattenObjectIds: true,
    //__v non-inclusion
    versionKey: false,
  });
};

export const findTags = async (): Promise<Tag[]> => {
  const documents = await TagModel.find();
  return documents.map((document) =>
    document.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    }),
  );
};

export const findTagByIds = async (tagIds: string[]): Promise<Tag[]> => {
  const documents = await TagModel.find({ _id: { $in: tagIds } });
  return documents.map((doc) =>
    doc.toJSON({
      //serialized ObjectId to string
      flattenObjectIds: true,
      //__v non-inclusion
      versionKey: false,
    }),
  );
};

export const updateTag = async (
  id: string,
  data: UpdateTagDTO,
): Promise<Tag> => {
  const document = await TagModel.findByIdAndUpdate(
    id,
    // update the document with the new data
    { $set: { ...data } },
    // return the updated document
    { new: true },
  );
  if (!document) {
    throw new Error("Tag not found");
  }
  return document.toJSON({
    flattenObjectIds: true,
    versionKey: false,
  });
};

export const deleteTag = async (id: string): Promise<Tag> => {
  const document = await TagModel.findByIdAndDelete(id);
  if (!document) {
    throw new Error("Tag not found");
  }
  return document.toJSON({
    flattenObjectIds: true,
    versionKey: false,
  });
};
