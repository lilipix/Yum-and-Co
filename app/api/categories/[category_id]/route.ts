import {
  updateCategory,
  deleteCategory,
} from "@/database/categories/category.repository";
import { NextRequest, NextResponse } from "next/server";
import { UpdateCategorySchema } from "../_validators/update-category.validator";
import { findRecipesByCategories } from "@/database/recipes/recipe.repository";
import { toast } from "sonner";

export async function PUT(
  request: NextRequest,
  { params }: { params: { category_id: string } },
) {
  try {
    const body = await request.json();
    const { name } = UpdateCategorySchema.parse(body);
    const updatedCategory = await updateCategory(params.category_id, {
      id: params.category_id,
      name,
    });
    return NextResponse.json(updatedCategory);
  } catch (schemaError) {
    console.error("Schema Validation Error:", schemaError);
    return NextResponse.json(
      { error: "Failed to update categories" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { category_id: string } },
) {
  try {
    const recipesByCategories = await findRecipesByCategories(
      params.category_id,
    );
    if (recipesByCategories.length > 0) {
      return NextResponse.json(
        { error: "Category has recipes associated with it" },
        { status: 400 },
      );
    }
    const deletedCategory = await deleteCategory(params.category_id);
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to delete categories" },
      { status: 500 },
    );
  }
}
