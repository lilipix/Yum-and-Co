"use client";

import Link from "next/link";
import { CardContent } from "@/components/ui/card";

import { RecipePopulated } from "@/validators/recipe";
import { Badge } from "@/components/ui/badge";
import { ColorPalette, Tag } from "@/validators/tag";
import { Image as ImageIcon, PinIcon, PinOff } from "lucide-react";
import useTogglePin from "@/hooks/useTogglePin";
import { Category } from "@/validators/category";
import Image from "next/image";

type RecipeProps = {
  initialRecipes: RecipePopulated[];
  categoryId?: string;
  tagsId?: string;
};

const RecipeList = ({ initialRecipes, categoryId, tagsId }: RecipeProps) => {
  const { recipeList, handleTogglePin } = useTogglePin({ initialRecipes });

  return (
    <div>
      <ul className="flex flex-wrap gap-4">
        {recipeList.map((recipe) => (
          <li
            className="mx-auto flex w-[300px] cursor-pointer flex-wrap rounded-xl bg-pinklight px-4 py-2 font-semibold transition duration-150 ease-in-out hover:border-pinklight hover:bg-pinkMedium"
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
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex-column">
                  <h2>{recipe.title}</h2>
                  <h3 className="text-sm font-light">{recipe.category.name}</h3>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleTogglePin(recipe.id, recipe.pinned);
                  }}
                  className="rounded-full pt-2 hover:bg-border-dark"
                  aria-label={recipe.pinned ? "Unpin Recipe" : "Pin Recipe"}
                >
                  {recipe.pinned ? (
                    <PinIcon size="16" fill="black" />
                  ) : (
                    <PinOff size="16" />
                  )}
                </button>
              </div>
              {recipe?.picture ? (
                <div className="relative mb-6 h-[150px] w-full">
                  <Image
                    className="p-O rounded-lg shadow-lg"
                    src={recipe?.picture}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                    alt="Picture of the recipe"
                  />
                </div>
              ) : (
                <div className="relative mb-6 flex h-[150px] w-full flex-col items-center justify-center rounded-lg bg-gray-300 text-sm text-gray-400">
                  <ImageIcon className="h-[100px] w-[100px]" />
                  <p>Pas d&apos;image disponible.</p>
                </div>
              )}
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
    </div>
  );
};

export default RecipeList;
