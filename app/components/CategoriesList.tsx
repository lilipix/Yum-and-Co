import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ICategory } from '@/validators/category';
import Link from "next/link";
import React from 'react';

type CategoriesListProps = {
    categories: ICategory[];
};
const CategoriesList = ({categories}:CategoriesListProps) => {
    return (
        <div className="max-w-[1024px] w-full mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Catégories</CardTitle>
                        {categories.length > 0 ? <CardDescription>Recherchez les recettes par catégories.</CardDescription>
                        : <CardDescription>Ajoutez une première recette pour afficher une catégorie</CardDescription>}
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-wrap gap-4">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                    className="flex flex-row flex-wrap items-center gap-2 bg-pinklight py-2 px-4 rounded-xl hover:bg-pinkMedium hover:border-pinkLight transition duration-150 ease-in-out cursor-pointer font-semibold" 
                                    href={`/categories/${category.id}`}>{category.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
        </div>
    );
};

export default CategoriesList;