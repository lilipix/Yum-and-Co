import { NextRequest, NextResponse } from "next/server";
import { CreateCategorySchema } from "./_validators/create-category.validator";
import {
  createCategory,
  findCategories,
} from "@/database/categories/category.repository";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const values = CreateCategorySchema.parse(body);

    const createdCategory = await createCategory({
      name: values.name,
    });

    return NextResponse.json(createdCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await findCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to find categories" },
      { status: 500 },
    );
  }
}
