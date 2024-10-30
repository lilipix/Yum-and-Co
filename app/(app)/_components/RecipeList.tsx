"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";

import { RecipePopulated } from "@/validators/recipe";
import { Badge } from "@/components/ui/badge";
import { ColorPalette, Tag } from "@/validators/tag";
import { PinIcon, PinOff } from "lucide-react";
import useTogglePin from "@/hooks/useTogglePin";
import { Category } from "@/validators/category";

type RecipeProps = {
  initialRecipes: RecipePopulated[];
  categoryId?: string;
  tagsId?: string;
};

const RecipeList = ({ initialRecipes, categoryId, tagsId }: RecipeProps) => {
  const { recipeList, handleTogglePin } = useTogglePin({ initialRecipes });

  return (
    <CardContent>
      <ul className="flex flex-wrap gap-4">
        {recipeList.map((recipe) => (
          <li
            className="mx-auto flex w-[200px] cursor-pointer flex-wrap rounded-xl bg-pinklight px-4 py-2 font-semibold transition duration-150 ease-in-out hover:border-pinklight hover:bg-pinkMedium"
            key={recipe.id}
          >
            <Link
              href={
                categoryId
                  ? `/categories/${categoryId}/${recipe.id}`
                  : tagsId
                    ? `/tags/${tagsId}/${recipe.id}`
                    : `/recipes/${recipe.id}`
              }
              className="block w-full"
            >
              <div className="flex items-start justify-between gap-2">
                <div>{recipe.title}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleTogglePin(recipe.id, recipe.pinned);
                  }}
                  className="rounded-full bg-border p-2 hover:bg-border-dark"
                  aria-label={recipe.pinned ? "Unpin Recipe" : "Pin Recipe"}
                >
                  {recipe.pinned ? <PinIcon size="16" /> : <PinOff size="16" />}
                </button>
              </div>
              <div className="mt-2 flex w-full flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <div key={tag.id}>
                    <Badge variant={tag.color || ColorPalette.SECONDARY}>
                      {tag.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </CardContent>
  );
};

export default RecipeList;
