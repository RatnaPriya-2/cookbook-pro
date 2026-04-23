import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [favoriteToLs, setFavoriteToLs] = useState(
    JSON.parse(localStorage.getItem("favoriteToLs")) || []
  );
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError("");
      try {
        if (!inputQuery.trim()) {
          const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
          const response = await fetch(url);
          const data = await response.json();
          setDisplayedMeals(data.meals || []);
        } else {
          const query = inputQuery.trim();
          const urls = [
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
          ];

          // Fetch name, ingredient, and cuisine simultaneously
          const responses = await Promise.allSettled(
            urls.map((url) => fetch(url).then((res) => res.json()))
          );

          let combinedMeals = [];
          responses.forEach((res) => {
            if (res.status === "fulfilled" && res.value.meals) {
              combinedMeals = [...combinedMeals, ...res.value.meals];
            }
          });

          // Remove potential duplicate meals using the idMeal as the unique key
          const uniqueMealsMap = new Map();
          combinedMeals.forEach((meal) => {
            if (!uniqueMealsMap.has(meal.idMeal)) {
              uniqueMealsMap.set(meal.idMeal, meal);
            }
          });

          setDisplayedMeals(Array.from(uniqueMealsMap.values()));
        }
      } catch (err) {
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce to wait 500ms before making the API requests
    const debounceTimer = setTimeout(() => {
      fetchMeals();
    }, 10000);

    return () => clearTimeout(debounceTimer);
  }, [inputQuery]);

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

  return (
    <>
      <div className="recipes-main-body">
        <div className="search-cluster">
          <p>Search recipes by name, ingredient, or cuisine...</p>
          <div className="search-block">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for recipes..."
            />
          </div>
        </div>
        <div className="recipe-container">
          {error ? (
            <p>{error}</p>
          ) : isLoading ? (
            <div
              style={{
                fontSize: "22px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          ) : displayedMeals.length === 0 ? (
            <p>No recipes found ...</p>
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
      </div>
    </>
  );
};

export default Recipes;
