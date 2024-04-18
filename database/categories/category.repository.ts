import { ICategory } from '@/validators/category';
import CategoryModel from './category.model';

export const createCategory = async (data: ICategory): Promise<ICategory> => {
    try {
        const document = await CategoryModel.create(data);
        return document.toJSON({
            //serialized ObjectId to string
            flattenObjectIds: true,
            //__v non-inclusion
            versionKey: false
        });
    } catch (error) {
        throw error;
    }
}