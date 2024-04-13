import { Schema, model, models, Model } from "mongoose";
import { IRecipe } from "../schemas/recipe";
import { Unit } from "../schemas/recipe/unit.schema";
import { IIngredients } from "../schemas/recipe/ingredients.schema";

const ingredientsSchema = new Schema<IIngredients>({
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

const recipeSchema = new Schema<IRecipe>({
  title: {
    type: String,
    required: true,
  },
  toReceive: {
    type: Boolean,
  },
//   category: {
//     type: String,
//     enum: Category,
//   },
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
    type: [ingredientsSchema],
    default: [],
  },
  preparation: {
    type: String,
    default: null,
  },
});

recipeSchema.virtual('id').get(function getVirtualId () {
  return this._id?.toHexString();
}
);

recipeSchema.set("toObject", { virtuals: true });
recipeSchema.set("toJSON", { virtuals: true });


const RecipeModel = (Model<IRecipe> =
  models.Recipe || model<IRecipe>("Recipe", recipeSchema));

export default RecipeModel;
