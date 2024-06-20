import { findRecipesByTag } from "@/database/recipes/recipe.repository";
import { findTagByIds } from "@/database/tags/tag.repository";
import connectToDatabase from "@/lib/mongodb";
import { Card, CardHeader } from "@/components/ui/card";
import TagsHeader from "./components/TagsHeader";
import RecipeList from "../../components/RecipeList";

type TagsPageProps = {
  params: {
    tags_id: string;
  };
};

const TagsPage = async ({ params }: TagsPageProps) => {
  const { tags_id } = params;

  // Decode the tag_ids "," separated string
  const decodedTagIds = decodeURIComponent(tags_id);

  const tagIdsArray = decodedTagIds.split(",");

  if (!tagIdsArray || tagIdsArray.length === 0) {
    throw new Error("No tag_ids provided");
  }

  await connectToDatabase();

  const tags = await findTagByIds(tagIdsArray);

  // Get all recipes that have all selected tags
  const recipesArrays = await Promise.all(
    tagIdsArray.map((tag_id) => findRecipesByTag(tag_id)),
  );

  const recipes = recipesArrays.flat();

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-8 p-6">
      <Card>
        <CardHeader>
          <TagsHeader tags={tags} recipes={recipes} />
        </CardHeader>
        <RecipeList recipes={recipes} />
      </Card>
    </div>
  );
};

export default TagsPage;
