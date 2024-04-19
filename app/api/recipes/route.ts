import { createRecipe } from '@/database/recipes/recipe.repository';
import { NextRequest, NextResponse } from 'next/server';
import { CreateRecipeSchema } from './_validators/create-recipe.validator';
import { createCategory } from '@/database/categories/category.repository';

export async function POST(request: NextRequest) {
    try {

  const body = await request.json();
  console.log(body)
  const values = CreateRecipeSchema.parse(body);
  console.log('VALUES',values)
    
    const createdCategory =  await createCategory({name: values.name});

    const recipe = await createRecipe({
        title: values.title,
        category: createdCategory.id,
        labels: values.labels,
        numberOfPersons: values.numberOfPersons,
        preparationTime: values.preparationTime,
        cookingTime: values.cookingTime,
        ovenTemperature: values.ovenTemperature,
        ingredients: values.ingredients,
        preparation: values.preparation,
    });

    // recipe = await createRecipe({
    //   title: values.title,
    //   category: createdCategory.id,
    //   labels: values.labels.map(label => label.id), // Transforme le tableau de labels en un tableau d'IDs de labels
    //   numberOfPersons: values.numberOfPersons,
    //   preparationTime: values.preparationTime,
    //   cookingTime: values.cookingTime,
    //   ovenTemperature: values.ovenTemperature,
    //   ingredients: values.ingredients.map(ingredient => ({ // Transforme le tableau d'ingrédients en un tableau d'objets avec les propriétés name et quantity
    //       name: ingredient.name,
    //       quantity: ingredient.quantity
    //   })),
    //   preparation: values.preparati
    console.log('recipe',recipe)
    return NextResponse.json(recipe);
} catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
}
}