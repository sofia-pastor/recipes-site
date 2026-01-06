import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import recipes from "../data/recipes.json";

import "../styles/RecipePage.css";

function getSliderSettings(numSlides) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: numSlides > 4 ? 2 : 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: numSlides > 3 ? 2 : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: numSlides > 2 ? 2 : 1,
        },
      },
    ],
  };

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
    const recipesList = recipesByTag[tag];
    const numSlides = recipesList.length;
    const sliderSettings = getSliderSettings(numSlides);

    return {
      tag: tag,
      recipes: recipesList,
      settings: sliderSettings,
    };
  });

  console.log(tagNames);

  return (
    <div className="RecipePage">
      <h2>Receitas</h2>
      <h1>Cookidoo</h1>
      <div className="recipes-index-container">
        <ul className="recipes-index">
          {tagNames.map((tagName, i) => {
            return (
              <li key={i} className="text-capitalize">
                <a href={`#${tagName}`}>{tagName}</a>
              </li>
            );
          })}
        </ul>
      </div>

      {sectionsData.map(function (section) {
        return (
          <section
            key={section.tag}
            id={section.tag}
            className="recipe-section"
          >
            <h3 className="text-capitalize">{section.tag}</h3>

            <div className="recipes-wrapper">
              <Slider {...section.settings}>
                {section.recipes.map((recipe) => {
                  return (
                    <div key={recipe.id} className="recipe-slide ">
                      <div className="card recipe-card h-100 mb-4">
                        {/* IMAGEM */}
                        <div className="card-img-wrapper">
                          <img
                            src={recipe.img}
                            className="card-img-top card-img"
                            alt={recipe.name}
                          />
                          <div className="card-img-overlay">
                            <p className="rate">⭐ {recipe.rate}</p>
                          </div>
                        </div>

                        {/* CORPO DO CARD */}
                        <div className="card-body">
                          <div className="card-text">
                            <p className="card-devices">
                              {recipe.devices.join(", ")}
                            </p>
                          </div>

                          <div className="card-heading">
                            <h5 className="card-title">{recipe.name}</h5>
                          </div>
                          {/* Devices */}

                          <div className="card-text">
                            {/* Tempo */}

                            <div className="time-container">
                              <div>
                                <p className="subtitle">Preparação: </p>
                                <p>{recipe.time.preparation}min🕒</p>
                              </div>
                              <div>
                                <p className="subtitle">Total:</p>
                                <p>{recipe.time.total}min🕒</p>
                              </div>
                            </div>

                            <div className="info-container ">
                              {/* Doses */}
                              <div className="d-flex align-items-center">
                                <p className="subtitle">Doses:</p>

                                {recipe.servings.map((serving, i) => (
                                  <p key={i} className="serving-item">
                                    {serving}
                                  </p>
                                ))}
                              </div>
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
