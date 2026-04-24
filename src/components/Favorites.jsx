import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem("favoriteToLs")) || []
  );
  useEffect(() => {
    localStorage.setItem("favoriteToLs", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavoriteToggle = (recipe) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal)
    );
  };

  return (
    <div className="recipes-main-body">
      <div className="search-cluster">
        <h1 className="recipe-details-title">Your Favorite Recipes</h1>
        <p>Keep track of the dishes you love most.</p>
      </div>

      <div className="recipe-container">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              newRecipe={recipe}
              isFavorite={true}
              onToggleFavorite={() => handleFavoriteToggle(recipe)}
            />
          ))
        ) : (
          <div className="empty-state">
            <i className="fa-regular fa-heart"></i>
            <p>No favorite recipes found yet.</p>
            <button className="btn-primary" onClick={() => (window.location.href = "/recipes")}>
              Browse Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
