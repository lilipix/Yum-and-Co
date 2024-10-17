import OutlineLink from "@/components/ui/custom/linkWithVariant";
import { Pencil } from "lucide-react";
import Link from "next/link";

type RecipeEditButtonProps = {
  recipe_id: string;
  category_id?: string;
};

const RecipeEditButton = ({
  recipe_id,
  category_id,
}: RecipeEditButtonProps) => {
  return (
    <div>
      <OutlineLink
        href={
          category_id
            ? `/categories/${category_id}/${recipe_id}/edit`
            : `/recipes/${recipe_id}/edit`
        }
      >
        <Pencil />
      </OutlineLink>
    </div>
  );
};

export default RecipeEditButton;
