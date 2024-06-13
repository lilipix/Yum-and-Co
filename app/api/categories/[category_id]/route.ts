import {
  updateCategory,
  deleteCategory,
} from "@/database/categories/category.repository";
import { NextRequest, NextResponse } from "next/server";
import { UpdateCategorySchema } from "../_validators/update-category.validator";

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
