import { toggleRecipePin } from "@/database/recipes/recipe.repository";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { recipe_id: string } },
) {
  try {
    const { recipe_id } = params;

    if (!recipe_id) {
      throw new Error("Id is missing");
    }

    const body = await request.json();
    const shouldPin = body.shouldPin;

    if (typeof shouldPin !== "boolean") {
      throw new Error("Invalid or missing 'shouldPin' value");
    }

    const result = await toggleRecipePin(recipe_id, shouldPin);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to toggle pin on recipe" },
      { status: 500 },
    );
  }
}
