import recipes from "../data/recipes.json";

export default function RecipePage() {
  const recipeInfo = recipes.map((recipe, i) => ({
    id: i + 1,
    name: recipe.name,
    img: recipe.img,
    tags: recipe.tags,
    link: recipe.link,
    rate: recipe.rate,
    time: recipe.time,
    devices: recipe.devices,
  }));

  console.log(recipeInfo.flatMap((recipes) => recipes.tags));

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

  console.log(recipesByTag);
  return (
    <div className="RecipePage">
      <h1>Receitas</h1>
      <h2>Cookidoo</h2>
      {tagNames.map((tag) => (
        <section key={tag} className="RecipeSection">
          {/* título da secção = nome da tag */}
          <h3 className="text-capitalize">{tag}</h3>

          <ul>
            {recipesByTag[tag].map((recipe) => (
              <li key={recipe.id}>
                {recipe.name}
                {/* Aqui depois podes trocar por um <RecipeCard recipe={recipe} /> */}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
