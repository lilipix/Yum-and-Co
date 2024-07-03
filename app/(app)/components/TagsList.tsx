"use client";

import { ColorPalette, Tag } from "@/validators/tag";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/validators/recipe";
import { fetchTags } from "@/services/tags.service";

type TagsListProps = {
  initialTags: Tag[];
  recipes: Recipe[];
};
const TagsList = ({ initialTags, recipes }: TagsListProps) => {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  // useEffect(() => {
  //   const getTags = async () => {
  //     const fetchedTags = await fetchTags();
  //     setTags(fetchedTags);
  //   };
  //   getTags();
  // }, []);

  const handleNavigation = () => {
    if (selectedTagIds.length > 0) {
      const tagsParam = selectedTagIds.join(",");
      router.push(`/tags/${tagsParam}`);
    }
  };

  const handleBadgeClick = (id: string) => {
    setSelectedTagIds((prevSelectedTagIds) =>
      prevSelectedTagIds.includes(id)
        ? prevSelectedTagIds.filter((tagId) => tagId !== id)
        : [...prevSelectedTagIds, id],
    );
  };

  // Get all tags from recipes that have all selected tags
  const getRelatedTags = (selectedTagIds: string[]) => {
    // Create a set to avoid duplicates and stock related tags
    const relatedTags = new Set<string>();
    recipes.forEach((recipe) => {
      // Check if the recipe has all selected tags
      if (selectedTagIds.every((tagId) => recipe.tags.includes(tagId))) {
        // Add all tags from the recipe
        recipe.tags.forEach((tag) => {
          if (tag) {
            relatedTags.add(tag);
          }
        });
      }
    });
    return relatedTags;
  };

  const relatedTags =
    selectedTagIds.length > 0 ? getRelatedTags(selectedTagIds) : null;

  return (
    <div className="mx-auto w-full max-w-[1024px] gap-8">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          {tags.length > 0 ? (
            <CardDescription>
              Sélectionnez le ou les tags pour trouver les recettes qui
              correspondent.
            </CardDescription>
          ) : (
            <CardDescription>Pas de tags existants.</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-4">
            {tags.map((tag) => {
              const isSelected = selectedTagIds.includes(tag.id);
              const isDisabled =
                selectedTagIds.length > 0 &&
                relatedTags &&
                !relatedTags.has(tag.id) &&
                !isSelected;

              return (
                <li key={tag.name}>
                  <Badge
                    onClick={() => {
                      !isDisabled ? handleBadgeClick(tag.id) : undefined;
                    }}
                    variant={tag.color || ColorPalette.SECONDARY}
                    className={`${isSelected ? "border-2 !border-gray-600" : ""} ${isDisabled ? "!cursor-not-allowed opacity-50" : "cursor-pointer"} text-sm`}
                  >
                    {tag.name}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardFooter className="self-end">
          <Button
            onClick={handleNavigation}
            disabled={selectedTagIds.length === 0}
          >
            Rechercher
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TagsList;
