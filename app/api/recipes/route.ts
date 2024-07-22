import {
  createRecipe,
  findRecipeByTitle,
  findRecipes,
} from "@/database/recipes/recipe.repository";
import { NextRequest, NextResponse } from "next/server";
import { CreateRecipeSchema } from "./_validators/create-recipe.validator";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const values = CreateRecipeSchema.parse(body);

    const existingRecipe = await findRecipeByTitle(values.title);
    if (existingRecipe) {
      return NextResponse.json(
        { error: "Recipe with this title already exists" },
        { status: 400 },
      );
    }

    const recipe = await createRecipe({
      title: values.title,
      category: values.category,
      tags: values.tags,
      numberOfPersons: values.numberOfPersons,
      preparationTime: values.preparationTime,
      cookingTime: values.cookingTime,
      ovenTemperature: values.ovenTemperature,
      ingredients: values.ingredients,
      preparation: values.preparation,
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("API ERROR", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const recipes = await findRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("API ERROR", error);
    return NextResponse.json(
      { error: "Failed to find recipes" },
      { status: 500 },
    );
  }
}
