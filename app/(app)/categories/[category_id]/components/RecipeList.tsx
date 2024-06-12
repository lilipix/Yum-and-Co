import Link from "next/link";
import { CardContent } from "@/components/ui/card";

import { RecipePopulated } from "@/validators/recipe";
import { Badge } from "@/components/ui/badge";
import { ColorPalette } from "@/validators/tag";

type RecipeProps = {
  recipes: RecipePopulated[];
};

const RecipeList = ({ recipes }: RecipeProps) => {
  return (
    <CardContent>
      <ul className="flex flex-wrap gap-4">
        {recipes.map((recipe) => (
          <li className="mx-auto flex" key={recipe.id}>
            <Link
              className="w-[200px] cursor-pointer flex-wrap items-center rounded-xl bg-pinklight px-4 py-2 font-semibold transition duration-150 ease-in-out hover:border-pinklight hover:bg-pinkMedium"
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
  );
};

export default RecipeList;
