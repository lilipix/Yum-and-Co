import { createRecipe } from "@/database/recipes/recipe.repository";
import { NextRequest, NextResponse } from "next/server";
import { CreateRecipeSchema } from "./_validators/create-recipe.validator";
import { createCategory } from "@/database/categories/category.repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const values = CreateRecipeSchema.parse(body);

    // const createdCategory = await createCategory({ name: values.category });

    const recipe = await createRecipe({
      title: values.title,
      category: values.category,
      labels: values.labels,
      numberOfPersons: values.numberOfPersons,
      preparationTime: values.preparationTime,
      cookingTime: values.cookingTime,
      ovenTemperature: values.ovenTemperature,
      ingredients: values.ingredients,
      preparation: values.preparation,
    });

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
