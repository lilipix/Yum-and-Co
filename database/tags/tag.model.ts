import { ColorPalette, Tag } from "@/validators/tag";
import { Model, Schema, model, models } from "mongoose";

const tagSchema = new Schema<Tag>({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: ColorPalette,
    default: ColorPalette.PRIMARY,
  },
});

tagSchema.virtual("id").get(function getVirtualId() {
  return this._id?.toHexString();
});
tagSchema.set("toObject", { virtuals: true });
tagSchema.set("toJSON", { virtuals: true });

const TagModel = (Model<Tag> =
  models.Label || model<Tag>("Label", tagSchema));

export default TagModel;
