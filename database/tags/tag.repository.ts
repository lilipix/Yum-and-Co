import { Tag } from '@/validators/tag';
import { CreateTagDTO } from './tag.dto';
import connectToDatabase from '@/lib/mongodb';
import TagModel from './tag.model';

export const createTag = async (data: CreateTagDTO): Promise<Tag> => {
    try {
        await connectToDatabase();
        const document = await TagModel.create(data);
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

export const findTags = async (): Promise<Tag[]> => {
    try {
        await connectToDatabase();
        const documents = await TagModel.find();
        return documents.map((document) =>
            document.toJSON({
                //serialized ObjectId to string
                flattenObjectIds: true,
                //__v non-inclusion
                versionKey: false,
            })
        );
    } catch (error) {
        throw error;
    }
}