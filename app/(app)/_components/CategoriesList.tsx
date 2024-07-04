"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/validators/category";
import Link from "next/link";
import useSWR from "swr";

type CategoriesListProps = {
  categories: Category[];
};
const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div className="mx-auto w-full max-w-[1024px]">
      <Card>
        <CardHeader>
          <CardTitle>Catégories</CardTitle>
          {categories.length > 0 ? (
            <CardDescription>
              Recherchez les recettes par catégories.
            </CardDescription>
          ) : (
            <CardDescription>
              Ajoutez une première recette pour afficher une catégorie.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className="flex cursor-pointer flex-row flex-wrap items-center gap-2 rounded-xl bg-pinklight px-4 py-2 font-semibold transition duration-150 ease-in-out hover:border-pinklight hover:bg-pinkMedium"
                  href={`/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesList;
