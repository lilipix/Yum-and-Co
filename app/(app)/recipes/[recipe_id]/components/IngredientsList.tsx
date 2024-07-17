"use client";

import useRecipe from "@/context/recipe/useRecipe";
import { formatQuantity } from "@/lib/utils/recipe.utils";
import { RecipePopulated } from "@/validators/recipe";
import { getUnitLabel } from "@/validators/recipe/ingredient.validator";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { number } from "zod";

const IngredientsList = () => {
  const { recipe } = useRecipe();
  const [numberOfServings, setNumberOfServings] = useState<number>(
    recipe?.numberOfPersons ?? 0,
  );
  const onIncrementServings = () => setNumberOfServings(numberOfServings + 1);
  const onDecrementServings = () => setNumberOfServings(numberOfServings - 1);
  const adjustedIngredients = (recipe?.ingredients ?? []).map((ingredient) => ({
    ...ingredient,
    baseQuantity:
      ((ingredient.baseQuantity ? ingredient.baseQuantity : 1) *
        (numberOfServings ? numberOfServings : 1)) /
      (recipe?.numberOfPersons ? recipe.numberOfPersons : 1),
  }));
  const totalIngredients = adjustedIngredients.length;
  const halfLength = Math.ceil(totalIngredients / 2);
  const firstColumnIngredients = adjustedIngredients.slice(0, halfLength);
  const secondColumnIngredients = adjustedIngredients.slice(halfLength);

  return (
    <div className="flex flex-col gap-4">
      {recipe?.numberOfPersons && (
        <div className="border-primary-solid mx-auto mb-4 flex h-10 w-fit rounded-md border-2 px-2 py-2">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={onDecrementServings}
              className="border-primary-solid border-r-2 px-2"
              disabled={numberOfServings === 1}
            >
              <Minus className="h-4 w-4 text-muted-foreground" />
            </button>
            <span className="text-sm font-medium">
              {numberOfServings}
              {numberOfServings === 1 ? " personne" : " personnes"}
            </span>
            <button
              onClick={onIncrementServings}
              className="border-primary-solid border-l-2 px-2"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
      {recipe && recipe.ingredients.length > 1 && (
        <div className="flex flex-wrap justify-evenly">
          <div className="flex flex-col">
            {firstColumnIngredients.map((ingredient) => (
              <div key={ingredient.name} className="flex flex-wrap">
                <span className="mr-1">
                  - {formatQuantity(ingredient.baseQuantity)}
                </span>
                <span className="mr-1">
                  {ingredient.unit ? getUnitLabel(ingredient.unit) : ""}
                </span>{" "}
                {ingredient.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {secondColumnIngredients.map((ingredient) => (
              <div key={ingredient.name} className="flex flex-wrap">
                <span className="mr-1">
                  - {formatQuantity(ingredient.baseQuantity)}
                </span>
                <span className="mr-1">
                  {" "}
                  {ingredient.unit ? getUnitLabel(ingredient.unit) : ""}
                </span>{" "}
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
