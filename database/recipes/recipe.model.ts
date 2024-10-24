import { Schema, model, models, Model, Types } from "mongoose";
import { IIngredient, Unit } from "@/validators/recipe/ingredient.validator";
import { Recipe } from "@/validators/recipe";
import CategoryModel from "../categories/category.model";
import LabelModel from "../tags/tag.model";
import TagModel from "../tags/tag.model";

export type RecipeDocument = Omit<Recipe, "category" | "tags"> & {
  category: Types.ObjectId;
  tags: Types.ObjectId[] | [];
};

const ingredientSchema = new Schema<IIngredient>({
  name: {
    type: String,
    default: null,
  },
  baseQuantity: {
    type: Number,
    default: null,
  },
  unit: {
    type: String,
    enum: Unit,
    default: null,
  },
});

const recipeSchema = new Schema<RecipeDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: CategoryModel,
      required: true,
    },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: TagModel,
      default: [],
    },
    numberOfPersons: {
      type: Number,
      default: null,
    },
    preparationTime: {
      type: String,
      default: null,
    },
    cookingTime: {
      type: String,
      default: null,
    },
    ovenTemperature: {
      type: String,
      default: null,
    },
    ingredients: {
      type: [ingredientSchema],
      default: [],
    },
    preparation: {
      type: String,
      default: null,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    picture: {
      type: String,
      required: true,
      validate: {
        // validate url
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: (props) => `${props.value} n'est pas une URL valide !`,
      },
    },
  },
  { timestamps: true },
);

recipeSchema.virtual("id").get(function getVirtualId() {
  return this._id?.toHexString();
});

recipeSchema.set("toObject", { virtuals: true });
recipeSchema.set("toJSON", {
  virtuals: true,
  flattenObjectIds: true,
  versionKey: false,
});

const RecipeModel: Model<RecipeDocument> =
  models.Recipe || model<RecipeDocument>("Recipe", recipeSchema);

export default RecipeModel;
