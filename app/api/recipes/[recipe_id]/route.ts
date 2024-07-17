import { updateRecipe } from "@/database/recipes/recipe.repository";
import { NextRequest, NextResponse } from "next/server";
import { updateRecipeSchema } from "../_validators/update-recipe-validator";

export async function PUT(
  request: NextRequest,
  { params }: { params: { recipe_id: string } },
) {
  try {
    const { recipe_id } = params;

    if (!recipe_id) {
      throw Error("Id is missing");
    }

    const body = await request.json();
    const values = updateRecipeSchema.parse(body);

    const updatedData = {
      id: recipe_id as string,
      ...values,
    };
    const result = await updateRecipe(updatedData);
    return NextResponse.json(result);
  } catch (schemaError) {
    console.error("Schema Validation Error:", schemaError);
    return NextResponse.json(
      { error: "Failed to update recipes" },
      { status: 500 },
    );
  }
}
