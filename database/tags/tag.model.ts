import { ColorPalette, Tag } from "@/validators/tag";
import { Model, Schema, model, models } from "mongoose";

const tagSchema = new Schema<Tag>({
  name: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    enum: ColorPalette,
    default: ColorPalette.DEFAULT,
  },
});

tagSchema.virtual("id").get(function getVirtualId() {
  return this._id?.toHexString();
});
tagSchema.set("toObject", { virtuals: true });
tagSchema.set("toJSON", { virtuals: true });

const TagModel: Model<Tag> = models.Tag || model<Tag>("Tag", tagSchema);

export default TagModel;
