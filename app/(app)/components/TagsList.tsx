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
import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/validators/recipe";

type TagsListProps = {
  tags: Tag[];
  recipes: Recipe[];
};
const TagsList = ({ tags, recipes }: TagsListProps) => {
  console.log("tags", tags);
  const router = useRouter();

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

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

  const getRelatedTags = (selectedTagIds: string[]) => {
    const relatedTags = new Set<string>();
    recipes.forEach((recipe) => {
      if (selectedTagIds.every((tagId) => recipe.tags.includes(tagId))) {
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
    selectedTagIds.length > 0
      ? getRelatedTags(selectedTagIds)
      : new Set<string>();

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
            <CardDescription>Ajoutez un tag dans une recette.</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-4">
            {tags.map((tag) => {
              const isSelected = selectedTagIds.includes(tag.id);
              const isDisabled =
                selectedTagIds.length > 0 &&
                !relatedTags.has(tag.id) &&
                !isSelected;

              return (
                <li key={tag.id}>
                  <Badge
                    onClick={() => handleBadgeClick(tag.id)}
                    variant={tag.color || ColorPalette.SECONDARY}
                    className={`${isSelected ? "border-2 !border-gray-600" : ""} ${isDisabled ? "!cursor-not-allowed opacity-50" : ""} cursor-pointer text-sm`}
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
