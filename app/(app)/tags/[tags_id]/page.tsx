import {
  findRecipesByTag,
  findRecipesByTags,
} from "@/database/recipes/recipe.repository";
import { findTagByIds } from "@/database/tags/tag.repository";
import connectToDatabase from "@/lib/mongodb";
import { Card, CardHeader } from "@/components/ui/card";
import TagsHeader from "./components/TagsHeader";
import RecipeList from "../../components/RecipeList";
import EditTag from "./components/EditTag";
import TagsProvider from "@/context/tags/provider";

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

  const recipes = await findRecipesByTags(tagIdsArray);

  return (
    <TagsProvider tags={tags}>
      <div className="mx-auto flex w-full max-w-[1024px] flex-col p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <TagsHeader tags={tags} recipes={recipes} />
              <div className="flex gap-2">
                <EditTag />
              </div>
            </div>
          </CardHeader>
          <RecipeList recipes={recipes} />
        </Card>
      </div>
    </TagsProvider>
  );
};

export default TagsPage;
