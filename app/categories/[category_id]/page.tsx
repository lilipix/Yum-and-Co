import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findCategoryById } from "@/database/categories/category.repository";
import { findRecipesByCategories } from "@/database/recipes/recipe.repository";
import connectToDatabase from "@/lib/mongodb";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ColorPalette } from "@/validators/tag";

type PageCategoryProps = {
  params: {
    category_id: string;
  };
};

const PageCategory = async ({ params }: PageCategoryProps) => {
  const { category_id } = params;

  await connectToDatabase();

  const category = await findCategoryById(category_id);

  const recipes = await findRecipesByCategories(category_id);

  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-col p-6">
      <Card>
        <CardHeader>
          <CardTitle>Catégorie : {category.name}</CardTitle>
          <CardDescription>
            Visualisez les recettes de la catégorie {category.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-4">
            {recipes.map((recipe) => (
              <li className="flex" key={recipe.id}>
                <Link
                  className="hover:border-pinkLight w-[200px] cursor-pointer flex-wrap items-center rounded-xl bg-pinklight px-4 py-2 font-semibold transition duration-150 ease-in-out hover:bg-pinkMedium"
                  href={`/recipes/${recipe.id}`}
                >
                  <div className="w-full">
                    <div>{recipe.title}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {recipe.tags.map((tag) => (
                        <div key={tag.id}>
                          <Badge variant={tag.color || ColorPalette.SECONDARY}>
                            {tag.name}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageCategory;
