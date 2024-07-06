import { Badge } from "@/components/ui/badge";
import { RecipePopulated } from "@/validators/recipe";
import { ColorPalette } from "@/validators/tag";
import { Clock12, CookingPot, Microwave, Thermometer } from "lucide-react";

type GeneralRecipeInformationProps = {
  recipe: RecipePopulated | null;
};
const GeneralRecipeInformation = ({
  recipe,
}: GeneralRecipeInformationProps) => {
  return (
    <>
      <div className="flex flex-col justify-center gap-4 md:w-1/2">
        <div className="flex flex-col gap-2">
          {recipe?.preparationTime && (
            <p className="flex items-center gap-2">
              <Clock12 />
              <span>Temps de préparation :</span>
              <span className="font-medium">{recipe.preparationTime} min</span>
            </p>
          )}
          {recipe?.cookingTime && (
            <p className="flex items-center gap-2">
              <CookingPot />
              <span>Temps de cuisson : </span>

              <span className="font-medium">{recipe.cookingTime} min</span>
            </p>
          )}
          {recipe?.ovenTemperature && (
            <p className="flex items-center gap-2">
              <Thermometer />
              <span>Température du four : </span>
              <span className="font-medium">{recipe.ovenTemperature}°</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralRecipeInformation;
