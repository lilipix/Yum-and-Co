import { NextRequest, NextResponse } from 'next/server';
import { CreateTagSchema } from './_validators/create-tag.validator';
import { createTag } from '@/database/tags/tag.repository';
import { Tag } from '@/validators/tag';
import { z } from 'zod';



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('BODY', body)
    const { name, color } = CreateTagSchema.parse(body);
    console.log('Parsed:', { name, color }); // Log après parsing
    const createdTag = await createTag({
      name, color,
    });
    console.log('API2',createdTag)
    return NextResponse.json(createdTag);
  } catch (schemaError) {
    console.error('Schema Validation Error:', schemaError);
    return NextResponse.json(
      { error: "Failed to create tags" },
      { status: 500 },
    );
  }
  
}
