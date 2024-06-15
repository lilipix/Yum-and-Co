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

type TagsListProps = {
  tags: Tag[];
};
const TagsList = ({ tags }: TagsListProps) => {
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
            <CardDescription>
              Ajoutez une première recette pour afficher un tag.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <li key={tag.id}>
                <Badge
                  onClick={() => handleBadgeClick(tag.id)}
                  variant={tag.color || ColorPalette.SECONDARY}
                  className={`${selectedTagIds.includes(tag.id) ? "border-2 !border-gray-600" : ""} cursor-pointer text-sm`}
                >
                  {tag.name}
                </Badge>
              </li>
            ))}
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
