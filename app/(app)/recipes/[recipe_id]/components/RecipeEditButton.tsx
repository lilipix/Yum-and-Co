import OutlineLink from "@/components/ui/custom/linkWithVariant";
import { Pencil } from "lucide-react";
import Link from "next/link";

type RecipeEditButtonProps = {
  recipe_id: string;
};

const RecipeEditButton = ({ recipe_id }: RecipeEditButtonProps) => {
  return (
    <div>
      <OutlineLink href={`/recipes/${recipe_id}/edit`}>
        <Pencil />
      </OutlineLink>
    </div>
  );
};

export default RecipeEditButton;
