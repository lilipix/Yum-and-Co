import { ICategory } from '@/validators/category';
import { Model, Schema, model, models } from 'mongoose';

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    });

    categorySchema.virtual('id').get(function getVirtualId () {
        return this._id?.toHexString();
    }
);
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

const CategoryModel = (Model<ICategory> = models.Category || model<ICategory>("Category", categorySchema));

export default CategoryModel;