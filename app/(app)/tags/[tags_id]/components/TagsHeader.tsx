"use client";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import useTags from "@/context/tags/useTags";
import { RecipePopulated } from "@/validators/recipe";
import { ColorPalette, Tag } from "@/validators/tag";
import { useEffect, useState } from "react";
import EditTag from "./EditTag";
import { fetchTags } from "@/services/tags.service";

type TagsHeaderProps = {
  recipes: RecipePopulated[];
  initialTags: Tag[];
};
const TagsHeader = ({ recipes, initialTags }: TagsHeaderProps) => {
  const [tags, setTags] = useState<Tag[]>(initialTags || []);
  const [refresh, setRefresh] = useState(false);

  const handleModalClose = () => {
    setRefresh((prev) => !prev);
  };
  useEffect(() => {
    const getTags = async () => {
      const fetchedTags = await fetchTags();
      if (fetchedTags.length > 0) {
        setTags(fetchedTags);
      }
    };
    getTags();
  }, [refresh]);

  return (
    <div>
      <CardTitle className="mb-4">
        {tags.map((tag) => (
          <Badge
            key={tag.name}
            className="mr-2 text-2xl font-semibold capitalize"
            variant={tag.color || ColorPalette.SECONDARY}
          >
            {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
          </Badge>
        ))}
      </CardTitle>
      <EditTag onModalClose={handleModalClose} />
      <CardDescription>
        {recipes.length === 0
          ? "Aucune recette liée à ce tag."
          : tags && tags.length > 1
            ? "Visualisez les recettes liées aux tags sélectionnés."
            : "Visualisez les recettes liées au tag sélectionné."}
      </CardDescription>
    </div>
  );
};

export default TagsHeader;
