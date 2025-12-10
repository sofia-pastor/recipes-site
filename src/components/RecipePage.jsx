import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import recipes from "../data/recipes.json";

function getSliderSettings(numSlides) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  if (numSlides > 4) {
    settings.rows = 2;
  } else {
    settings.rows = 1;
  }

  return settings;
}

export default function RecipePage() {
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
    rate: recipe.rate,
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

  //console.log(recipesByTag);

  const sectionsData = tagNames.map(function (tag) {
    const recipesList = recipesByTag[tag];
    const numSlides = recipesList.length;
    const sliderSettings = getSliderSettings(numSlides);

    return {
      tag: tag,
      recipes: recipesList,
      settings: sliderSettings,
    };
  });

  return (
    <div className="RecipePage">
      <h1>Receitas</h1>
      <h2>Cookidoo</h2>

      {sectionsData.map(function (section) {
        return (
          <section key={section.tag} className="RecipeSection">
            <h3 className="text-capitalize">{section.tag}</h3>

            <div className="recipes-wrapper">
              <Slider {...section.settings}>
                {section.recipes.map((recipe) => {
                  return (
                    <div key={recipe.id} className="recipe-slide px-2">
                      <div className="card recipe-card h-100 mb-4">
                        {/* IMAGEM */}
                        <img
                          src={recipe.img}
                          className="card-img-top"
                          alt={recipe.name}
                        />

                        {/* CORPO DO CARD */}
                        <div className="card-body">
                          <div className="card-heading">
                            <h5 className="card-title">{recipe.name}</h5>
                          </div>
                          {/* Devices */}

                          <div className="card-text">
                            <p className="card-devices">
                              {recipe.devices.join(", ")}
                            </p>

                            {/* Tempo */}

                            <h6>Tempo 🕒</h6>
                            <div className="time-container">
                              <p>
                                <span className="subtitle">Preparação:</span>{" "}
                                {recipe.time.preparation}min
                              </p>
                              <p>
                                <span className="subtitle">Total:</span>{" "}
                                {recipe.time.total}min
                              </p>
                            </div>

                            <div className="info-container align-items-center">
                              {/* Doses */}
                              <div className="d-flex align-items-center">
                                <p className="subtitle">Doses:</p>
                                {recipe.servings.map((serving, i) => (
                                  <p key={i} className="serving-item">
                                    {serving}
                                  </p>
                                ))}
                              </div>

                              {/* Rates */}
                              <p className="rate">⭐ {recipe.rate}</p>
                            </div>
                          </div>
                        </div>

                        {/* FOOTER */}
                        <div className="card-footer">
                          <a
                            href={recipe.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Ver receita na Cookidoo
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </section>
        );
      })}
    </div>
  );
}
