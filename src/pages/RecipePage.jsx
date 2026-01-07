import { useState, useEffect } from "react";

import recipes from "../data/recipes.json";

import RecipesIndex from "../components/RecipesIndex";
import RecipesSection from "../components/RecipesSection";

import "../styles/RecipePage.css";

export default function RecipePage() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    handleResize(); // <-- importante: corre logo ao montar

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  const recipeInfo = recipes.map((recipe, i) => ({
    id: i + 1,
    name: recipe.name,
    img: recipe.img,
    tags: recipe.tags,
    link: recipe.link,
    rate: recipe.rate,
    servings: recipe.servings,
    time: recipe.time,
    devices: recipe.devices,
  }));

  //Agrupar por tag
  const recipesByTag = recipeInfo.reduce((acc, recipe) => {
    recipe.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(recipe);
    });
    return acc;
  }, {});

  const tagNames = Object.keys(recipesByTag).sort((a, b) =>
    a.localeCompare(b, "pt")
  );

  const sectionsData = tagNames.map(function (tag) {
    return {
      tag: tag,
      recipes: recipesByTag[tag],
    };
  });

  return (
    <div className="RecipePage">
      <h2>Receitas</h2>
      <h1>Cookidoo</h1>

      <RecipesIndex tagNames={tagNames} />

      {sectionsData.map(function (section) {
        return (
          <RecipesSection
            key={section.tag}
            section={section}
            viewportWidth={viewportWidth}
          />
        );
      })}
    </div>
  );
}
