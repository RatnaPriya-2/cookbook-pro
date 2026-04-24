import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useGlobalContext } from "../context/context";

const Recipes = () => {
  const {
    displayedMeals,
    inputQuery,
    setInputQuery,
    isLoading,
    error,
    fetchMeals,
    categories,
    activeCategory,
    setActiveCategory,
    activeCuisine,
    setActiveCuisine,
    allFetchedMeals,
  } = useGlobalContext();

  const [favoriteToLs, setFavoriteToLs] = useState(
    JSON.parse(localStorage.getItem("favoriteToLs")) || []
  );

  // 🔥 Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMeals(inputQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [inputQuery]);

  // 🔥 Dynamic Chips
  const isSearching = inputQuery.trim().length > 0;

  const dynamicChips = isSearching
    ? [...new Set(allFetchedMeals.map((m) => m.strArea))]
      .filter(Boolean)
      .sort()
    : categories;





  // 🔥 Search input handler
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setInputQuery(val);

    if (val.trim() !== "") {
      setActiveCategory("All"); // switch to search mode
    } else {
      setActiveCuisine(""); // reset cuisine when clearing
    }
  };

  // 🔥 Favorites
  const handleFavoriteToggle = (recipe) => {
    setFavoriteToLs((prev) => {
      const isFav = prev.some((f) => f.idMeal === recipe.idMeal);

      const updated = isFav
        ? prev.filter((f) => f.idMeal !== recipe.idMeal)
        : [...prev, recipe];

      localStorage.setItem("favoriteToLs", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (recipe) =>
    favoriteToLs.some((f) => f.idMeal === recipe.idMeal);

  // 🔥 Skeleton Loader
  const SkeletonCard = () => (
    <div className="card-body skeleton-card">
      <div className="card-img skeleton-pulse"></div>
      <div className="card-content">
        <div className="skeleton-line skeleton-pulse" style={{ width: "70%" }}></div>
        <div className="skeleton-line skeleton-pulse" style={{ width: "40%", marginTop: "1rem" }}></div>
        <div className="btn-cluster" style={{ marginTop: "2rem" }}>
          <div className="skeleton-btn skeleton-pulse"></div>
          <div className="skeleton-btn skeleton-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="recipes-main-body">
      {/* 🔍 SEARCH */}
      <div className="search-cluster">
        <p>
          {isSearching
            ? "Filter Results by Cuisine"
            : "Search Recipes by Name, Ingredient or Cuisine"}
        </p>

        <div className="search-block">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="What would you like to cook?"
            value={inputQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* 🔥 FILTER CHIPS */}
        <div className="category-container">
          <div
            className={`category-chip ${isSearching
              ? activeCuisine === ""
              : activeCategory === "All"
                ? "active"
                : ""
              }`}
            onClick={() =>
              isSearching
                ? setActiveCuisine("")
                : setActiveCategory("All")
            }
          >
            All
          </div>

          {dynamicChips.map((chip) => (
            <div
              key={chip}
              className={`category-chip ${isSearching
                ? activeCuisine === chip
                : activeCategory === chip
                  ? "active"
                  : ""
                }`}
              onClick={() =>
                isSearching
                  ? setActiveCuisine(chip)
                  : setActiveCategory(chip)
              }
            >
              {chip}
            </div>
          ))}
        </div>
      </div>

      {/* 🍽️ RECIPES */}
      <div className="recipe-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : displayedMeals.length === 0 ? (
          <p className="empty-message">
            No recipes found. Try a different search!
          </p>
        ) : (
          displayedMeals.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              newRecipe={recipe}
              isFavorite={isFavorite(recipe)}
              onToggleFavorite={() => handleFavoriteToggle(recipe)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Recipes;