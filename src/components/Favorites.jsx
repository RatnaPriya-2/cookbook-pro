import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { useGlobalContext } from "../context/context";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useGlobalContext();

  return (
    <div className="recipes-main-body">
      <div className="search-cluster">
        <h1 className="recipe-details-title">Your Favorite Recipes</h1>
        <p>Keep track of the dishes you love most.</p>
      </div>

      <div className="recipe-container">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              newRecipe={recipe}
              isFavorite={isFavorite(recipe)}
              onToggleFavorite={() => toggleFavorite(recipe)}
            />
          ))
        ) : (
          <div className="empty-state">
            <i className="fa-regular fa-heart"></i>
            <p>No favorite recipes found yet.</p>
            <button className="btn-primary" onClick={() => navigate("/recipes")}>
              Browse Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
