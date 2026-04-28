import React, { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useGlobalContext } from "../context/context";

// 🔥 Moved outside component to prevent remount on every render
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
    favorites,
    toggleFavorite,
    isFavorite,
  } = useGlobalContext();

  // 🔥 Debounced search — only fires when user is actively searching
  useEffect(() => {
    if (!inputQuery.trim()) return; // context handles empty/browse state
    const timer = setTimeout(() => {
      fetchMeals(inputQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [inputQuery, fetchMeals]);

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
            className={`category-chip ${
              isSearching
                ? activeCuisine === "" ? "active" : ""
                : activeCategory === "All" ? "active" : ""
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
              className={`category-chip ${
                isSearching
                  ? activeCuisine === chip ? "active" : ""
                  : activeCategory === chip ? "active" : ""
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
              onToggleFavorite={() => toggleFavorite(recipe)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Recipes;