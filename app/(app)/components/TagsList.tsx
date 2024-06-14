import { ColorPalette, Tag } from "@/validators/tag";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

type TagsListProps = {
  tags: Tag[];
};
const TagsList = ({ tags }: TagsListProps) => {
  return (
    <div className="mx-auto w-full max-w-[1024px] gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          {tags.length > 0 ? (
            <CardDescription>
              Sélectionnez le ou les tags pour trouvez les recettes qui
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
                <Link href={`/tags/${tag.id}`}>
                  <Badge
                    variant={tag.color || ColorPalette.SECONDARY}
                    className="text-sm"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TagsList;
