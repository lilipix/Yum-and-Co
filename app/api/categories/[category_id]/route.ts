import {
  updateCategory,
  deleteCategory,
  findCategories,
} from "@/database/categories/category.repository";
import { NextRequest, NextResponse } from "next/server";
import { UpdateCategorySchema } from "../_validators/update-category.validator";
import { findRecipesByCategories } from "@/database/recipes/recipe.repository";
export const maxDuration = 60;
export async function PUT(
  request: NextRequest,
  { params }: { params: { category_id: string } },
) {
  try {
    console.log("PUT request received for category_id:", params.category_id);
    const body = await request.json();
    console.log("Request body:", body);
    const { name } = UpdateCategorySchema.parse(body);
    console.log("Parsed name:", name);
    const updatedCategory = await updateCategory(params.category_id, {
      id: params.category_id,
      name,
    });
    console.log("Category updated successfully:", updatedCategory);
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
    console.log("Category deleted successfully:", deletedCategory);
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to delete categories" },
      { status: 500 },
    );
  }
}
