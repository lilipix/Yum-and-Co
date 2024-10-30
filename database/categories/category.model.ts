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
// categorySchema.set("toJSON", {
//   virtuals: true,
//   flattenObjectIds: true,
//   versionKey: false,
// });

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    // Remplace `_id` par `id` et supprime `_id`
    ret.id = ret._id?.toString();
    delete ret._id;
    return ret;
  },
});

const CategoryModel: Model<Category> =
  models.Category || model<Category>("Category", categorySchema);

export default CategoryModel;
