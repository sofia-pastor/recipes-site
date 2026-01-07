import { useState, useEffect, useRef } from "react";

import "../styles/recipesIndex.css";

export default function RecipesIndex({ tagNames }) {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const visibleTagNamesCount = 10;
  const favoriteTags = [
    "entradas",
    "carne",
    "peixe",
    "vegetariano",
    "acompanhamento",
    "sopas",
    "refeições",
    "sobremesas",
    "pequeno-almoço",
    "bebidas",
  ];

  // (mobile behavior)
  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 576) return;

    let ticking = false;
    let lastY = window.scrollY;

    function onScroll() {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY;

        if (currentY > 220) {
          if (delta > 0 && showCategories) {
            setShowCategories(false);
          }

          if (delta < 0 && !showCategories) {
            setShowCategories(true);
          }
        }

        lastY = currentY;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showCategories]);

  //search behavior
  function normalize(str) {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function goToCategory(rawValue) {
    const match = tagNames.find(function (tagName) {
      return normalize(tagName) === normalize(rawValue);
    });

    if (!match) return false;

    const el = document.getElementById(match);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setValue(""); // limpa para o index não ficar “preso”
    return true;
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleInput(e) {
    goToCategory(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); //
    goToCategory(value);
  }

  //button behaviour
  let visibleTags;
  if (expanded) {
    visibleTags = tagNames;
  } else {
    visibleTags = favoriteTags.filter((tag) => tagNames.includes(tag));
  }

  // fallback: se nenhuma favorita existir (por erros de escrita), mostra as primeiras 10
  if (visibleTags.length === 0) {
    visibleTags = tagNames.slice(0, 10);
  }

  function toggleExpanded() {
    // NEW: se a lista estiver escondida por scroll, clicar no botão volta a mostrá-la
    setShowCategories(true);
    // toggle
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }

  function handleIndexLinkClick() {
    setExpanded(false);
  }

  // mostrar lista:
  // - desktop: sempre
  // - mobile: depende do showCategories
  let showList;
  if (window.innerWidth <= 576) {
    showList = showCategories;
  } else {
    showList = true;
  }

  return (
    <div className="recipes-index-container">
      <div className="index-features-container">
        {tagNames.length > visibleTagNamesCount && (
          <button
            type="button"
            className="index-toggle"
            onClick={toggleExpanded}
          >
            {expanded
              ? "Mostrar menos categorias"
              : "Mostrar todas as categorias"}
          </button>
        )}
        <form
          className="category-search-container"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            id="category-search"
            list="categories-list"
            value={value}
            onChange={handleChange}
            onInput={handleInput}
            placeholder="Procurar por categoria..."
            autoComplete="off"
            className="input-form"
          />
          <datalist id="categories-list">
            {tagNames.map((tagName, i) => (
              <option key={i} value={tagName} />
            ))}
          </datalist>
        </form>
      </div>
      <ul
        className={`recipes-index ${
          showCategories ? "is-visible" : "is-hidden"
        }`}
      >
        {visibleTags.map((tagName, i) => {
          return (
            <li key={i} className="text-capitalize">
              <a href={`#${tagName}`} onClick={handleIndexLinkClick}>
                {tagName}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
