import {
  deleteRecipe,
  findRecipeById,
  updateRecipe,
} from "@/database/recipes/recipe.repository";
import { NextRequest, NextResponse } from "next/server";
import { updateRecipeSchema } from "../_validators/update-recipe-validator";
import connectToDatabase from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { recipe_id: string } },
) {
  try {
    await connectToDatabase();
    const { recipe_id } = params;
    console.log("API>>>>", recipe_id);

    if (!recipe_id) {
      throw Error("Id is missing");
    }

    const recipe = await findRecipeById(recipe_id);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("API ERROR", error);
    return NextResponse.json(
      { error: "Failed to find recipes" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { recipe_id: string } },
) {
  try {
    await connectToDatabase();
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { recipe_id: string } },
) {
  try {
    await connectToDatabase();
    const deletedRecipe = await deleteRecipe(params.recipe_id);
    return NextResponse.json(deletedRecipe);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to delete recipes" },
      { status: 500 },
    );
  }
}
