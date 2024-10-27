import { Category } from "@/validators/category";
import { Model, Schema, model, models } from "mongoose";

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.virtual("id").get(function getVirtualId() {
  return this._id?.toHexString();
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", {
  virtuals: true,
  flattenObjectIds: true,
  versionKey: false,
});

const CategoryModel: Model<Category> =
  models.Category || model<Category>("Category", categorySchema);

export default CategoryModel;
