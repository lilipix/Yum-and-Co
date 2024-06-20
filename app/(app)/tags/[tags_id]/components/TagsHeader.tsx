import { CardDescription, CardTitle } from "@/components/ui/card";
import { Recipe, RecipePopulated } from "@/validators/recipe";
import { Tag } from "@/validators/tag";

type TagsHeaderProps = {
  tags: Tag[];
  recipes: RecipePopulated[];
};
const TagsHeader = ({ tags, recipes }: TagsHeaderProps) => {
  const formattedTags = tags
    .map((tag) => {
      return tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
    })
    .join(" / ");

  return (
    <div>
      <CardTitle className="mb-2">{formattedTags}</CardTitle>
      <CardDescription>
        {recipes.length === 0
          ? "Aucune recette liée à ce tag."
          : tags.length > 1
            ? `Visualisez les recettes liées aux tags suivants : ${formattedTags}`
            : `Visualisez les recettes liées au tag suivant : ${formattedTags}`}
      </CardDescription>
    </div>
  );
};

export default TagsHeader;
