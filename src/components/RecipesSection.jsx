import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import RecipeCard from "./RecipeCard";

function getSliderSettings(numSlides, viewportWidth) {
  let slidesToShow = 4;
  let slidesToScroll = 4;
  let rows = numSlides > 4 ? 2 : 1;

  if (viewportWidth <= 600) {
    slidesToShow = 2;
    slidesToScroll = 2;
    rows = numSlides > 2 ? 2 : 1;
  } else if (viewportWidth <= 768) {
    slidesToShow = 3;
    slidesToScroll = 3;
    rows = 1;
  } else if (viewportWidth <= 1024) {
    slidesToShow = 3;
    slidesToScroll = 3;
    rows = numSlides > 3 ? 2 : 1;
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: false,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    rows: rows,
  };

  return settings;
}

export default function RecipesSection({ section, viewportWidth }) {
  const numSlides = section.recipes.length;
  const settings = getSliderSettings(numSlides, viewportWidth);

  return (
    <section id={section.tag} className="recipe-section">
      <h3 className="text-capitalize">{section.tag}</h3>

      <div className="recipes-wrapper">
        <Slider {...settings}>
          {section.recipes.map((recipe) => {
            return (
              <div key={recipe.id} className="recipe-slide">
                <RecipeCard recipe={recipe} />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
