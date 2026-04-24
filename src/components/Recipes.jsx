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
    allFetchedMeals
  } = useGlobalContext();

  const [favoriteToLs, setFavoriteToLs] = useState(
    JSON.parse(localStorage.getItem("favoriteToLs")) || []
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchMeals(inputQuery);
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [inputQuery]);

  // --- Dynamic Chip Logic ---
  const isSearching = inputQuery.trim().length > 0;
  const dynamicChips = isSearching 
    ? [...new Set(allFetchedMeals.map(m => m.strArea))].filter(Boolean).sort()
    : categories;

  const currentActive = isSearching ? activeCuisine : activeCategory;

  const handleChipClick = (chip) => {
    if (isSearching) {
      setActiveCuisine(activeCuisine === chip ? "" : chip);
    } else {
      setActiveCategory(activeCategory === chip ? "" : chip);
    }
  };

  const handleFavoriteToggle = (recipe) => {
    setFavoriteToLs((prev) => {
      const isFavorite = prev.some((fav) => fav.idMeal === recipe.idMeal);
      const updatedFavorites = isFavorite
        ? prev.filter((fav) => fav.idMeal !== recipe.idMeal)
        : [...prev, recipe];
      localStorage.setItem("favoriteToLs", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFavorite = (recipe) =>
    favoriteToLs.some((fav) => fav.idMeal === recipe.idMeal);

  // Skeleton Loader Component
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
      <div className="search-cluster">
        <p>{isSearching ? "Filter Results by Cuisine" : "Search Recipes by Name, Ingredient or Cuisine"}</p>
        <div className="search-block">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="What would you like to cook?"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />
        </div>

        <div className="category-container">
          <div 
            className={`category-chip ${!currentActive ? 'active' : ''}`}
            onClick={() => isSearching ? setActiveCuisine("") : setActiveCategory("")}
          >
            All
          </div>
          {dynamicChips.map((chip) => (
            <div
              key={chip}
              className={`category-chip ${currentActive === chip ? "active" : ""}`}
              onClick={() => handleChipClick(chip)}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : displayedMeals.length === 0 ? (
          <p className="empty-message">No recipes found. Try a different search!</p>
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
