import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findCategoryById } from '@/database/categories/category.repository';
import { findRecipesByCategories } from '@/database/recipes/recipe.repository';
import connectToDatabase from '@/lib/mongodb';
import React from 'react';
import Link from "next/link";
import { Badge } from '@/components/ui/badge';
import { ColorPalette } from '@/validators/tag';


type PageCategoryProps = {
    params: {
        category_id: string;
    };
};

const PageCategory =  async({params}:PageCategoryProps) => {

const {category_id} = params;

await connectToDatabase();

const category = await findCategoryById(category_id);

const recipes = await findRecipesByCategories(category_id);

    return (
        <div className="flex flex-col p-6 max-w-[1024px] w-full mx-auto">
                <Card>
                <CardHeader>
                    <CardTitle>Catégorie : {category.name}</CardTitle>
                    <CardDescription>Visualisez les recettes de la catégorie {category.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="flex flex-wrap gap-4">{recipes.map((recipe)=> (
                    <li className="flex" key={recipe.id}>
                        <Link className="flex-wrap items-center bg-pinklight py-2 px-4 rounded-xl hover:bg-pinkMedium hover:border-pinkLight transition duration-150 ease-in-out cursor-pointer font-semibold w-[200px]"  href={`/recipes/${recipe.id}`}>
                            <div className="w-full">
                            <div>{recipe.title}</div>
                            <div className="flex flex-wrap gap-2 mt-2">    
                        {recipe.tags?.map((tag) => (
                            <div key= {tag.id}>
                            <Badge			
                            className="h-fit"
										variant={ tag.color || ColorPalette.SECONDARY }
									>
										{tag.name}
									</Badge>
                                    </div>
                        ))}
                        </div>
                        
                        </div>
 
                        </Link>
                    </li>
                    ))}
                    </ul>
                    </CardContent>
            </Card>
        </div>
    );
};

export default PageCategory;