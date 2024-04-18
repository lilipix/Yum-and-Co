import { Schema, model, models, Model, Types } from "mongoose";
import { IIngredient,  Unit } from '@/validators/recipe/ingredient.validator';
import { Recipe } from '@/validators/recipe';
import CategoryModel from '../categories/category.model';
import LabelModel from '../labels/label.model';

export type RecipeDocument = Omit<Recipe, 'category' | 'labels'> & {
    category: Types.ObjectId;
    labels: Types.ObjectId[] | [];
}

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

const recipeSchema = new Schema<RecipeDocument>({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: CategoryModel,
    required: true,
  },
  labels:{
    type: [Schema.Types.ObjectId],
    ref: LabelModel,
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
});

// recipeSchema.virtual('id').get(function getVirtualId () {
//   return this._id?.toHexString();
// }
// );

recipeSchema.set("toObject", { virtuals: true });
recipeSchema.set("toJSON", { virtuals: true });


const RecipeModel : Model<RecipeDocument> =
  models.Recipe || model<RecipeDocument>("Recipe", recipeSchema);

export default RecipeModel;
