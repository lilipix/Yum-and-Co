import RecipeProvider from "@/context/recipe/provider";
// import TagsProvider from "@/context/tags/provider";
import { findTagByIds } from "@/database/tags/tag.repository";
import connectToDatabase from "@/lib/mongodb";
import { ReactNode } from "react";

type TagLayoutProps = {
  children: ReactNode;
  // params: {
  //   tags_id: string;
  // };
};

const TagLayout = async ({ children }: TagLayoutProps) => {
  // const { tags_id } = params;

  // // Decode the tag_ids "," separated string
  // const decodedTagIds = decodeURIComponent(tags_id);

  // const tagIdsArray = decodedTagIds.split(",");

  // if (!tagIdsArray || tagIdsArray.length === 0) {
  //   throw new Error("No tag_ids provided");
  // }

  // await connectToDatabase();

  // const tags = await findTagByIds(tagIdsArray);

  return (
    <div>
      {/* <TagsProvider tags={tags}> */}
      {children}
      {/* </TagsProvider> */}
    </div>
  );
};

export default TagLayout;
