import { createRecipe } from '@/database/recipes/recipe.repository';
import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipeSchema } from './_validators/create-recipe.validator';

export async function POST(request: NextRequest) {
    try {
  const body = await request.json();
  const values = CreateRecipeSchema.parse(body);
    const recipe = await createRecipe(values);
    return NextResponse.json(recipe);
} catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
}
}