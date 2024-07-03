import RecipeProvider from "@/context/recipe/provider";
// import TagsProvider from "@/context/tags/provider";
import { findTagByIds } from "@/database/tags/tag.repository";
import connectToDatabase from "@/lib/mongodb";
import { ReactNode } from "react";

type TagLayoutProps = {
  children: ReactNode;
};

const TagLayout = async ({ children }: TagLayoutProps) => {
  return <div>{children}</div>;
};

export default TagLayout;
