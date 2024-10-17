import { NextRequest, NextResponse } from "next/server";
import { CreateTagSchema } from "./_validators/create-tag.validator";
import { createTag, findTags } from "@/database/tags/tag.repository";
import { Tag } from "@/validators/tag";
import { z } from "zod";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, color } = CreateTagSchema.parse(body);
    const createdTag = await createTag({
      name,
      color,
    });
    return NextResponse.json(createdTag);
  } catch (schemaError) {
    console.error("Schema Validation Error:", schemaError);
    return NextResponse.json(
      { error: "Failed to create tags" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const tags = await findTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}
