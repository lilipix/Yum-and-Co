import { findRecipesByTag } from "@/database/recipes/recipe.repository";
import { findTagByIds } from "@/database/tags/tag.repository";
import connectToDatabase from "@/lib/mongodb";
import React from "react";
import RecipeListByTag from "./components/RecipeListByTag";
import { Card, CardHeader } from "@/components/ui/card";
import CategoryHeader from "../../categories/[category_id]/components/CategoryHeader";
import TagsHeader from "./components/TagsHeader";

type TagsPageProps = {
  params: {
    tags_id: string | string[];
  };
};

const TagsPage = async ({ params }: TagsPageProps) => {
  const { tags_id } = params;
  console.log("tagsids", tags_id);
  const tagIdsArray = Array.isArray(tags_id) ? tags_id : [tags_id];
  if (!tagIdsArray || tagIdsArray.length === 0) {
    throw new Error("No tag_ids provided");
  }
  await connectToDatabase();

  const tags = await findTagByIds(tagIdsArray);
  console.log(tags);

  const recipesArrays = await Promise.all(
    tagIdsArray.map((tag_id) => findRecipesByTag(tag_id)),
  );
  const recipes = recipesArrays.flat();

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <TagsHeader tags={tags} />
            <div className="flex gap-2"></div>
          </div>
        </CardHeader>
        <RecipeListByTag tags={tags} recipes={recipes} />
      </Card>
    </div>
  );
};

export default TagsPage;
