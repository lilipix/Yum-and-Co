import { findRecipesByTags } from "@/database/recipes/recipe.repository";
import { findTagByIds } from "@/database/tags/tag.repository";
import connectToDatabase from "@/lib/mongodb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TagsHeader from "./components/TagsHeader";
import EditTag from "./components/EditTag";
import TagsProvider from "@/context/tags/provider";
import RecipeListContainer from "./components/RecipesListContainer";
import DeleteTags from "./components/DeleteTags";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    <div className="mx-auto flex w-full max-w-[1024px] flex-col space-y-6 p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {tags.map((tag) => tag.name).join(" - ")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TagsProvider tags={tags}>
        <div>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <TagsHeader recipes={recipes} />
                <div className="flex gap-2">
                  <EditTag />
                  <DeleteTags />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RecipeListContainer initialRecipes={recipes} tagsId={tags_id} />
            </CardContent>
          </Card>
        </div>
      </TagsProvider>
    </div>
  );
};

export default TagsPage;
