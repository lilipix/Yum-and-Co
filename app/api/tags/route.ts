import { NextRequest, NextResponse } from 'next/server';
import { CreateTagSchema } from './_validators/create-tag.validator';
import { createTag } from '@/database/tags/tag.repository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const values = CreateTagSchema.parse(body);

    const createdTag = await createTag({
      name: values.name,
        color: values.color,
    });

    return NextResponse.json(createdTag);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 },
    );
  }
}