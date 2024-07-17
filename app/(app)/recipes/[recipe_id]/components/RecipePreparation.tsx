"use client";

import useRecipe from "@/context/recipe/useRecipe";
import React from "react";

const RecipePreparation = () => {
  const { recipe } = useRecipe();

  return (
    <div>
      {recipe &&
        recipe.preparation
          ?.split("\n")
          .map((line, index) => <p key={index}>{line}</p>)}
    </div>
  );
};

export default RecipePreparation;
