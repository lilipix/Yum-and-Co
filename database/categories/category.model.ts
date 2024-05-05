import { ICategory } from "@/validators/category";
import { Model, Schema, model, models } from "mongoose";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true, 
	versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    return ret; }
  });

const CategoryModel = (Model<ICategory> =
  models.Category || model<ICategory>("Category", categorySchema));

export default CategoryModel;
