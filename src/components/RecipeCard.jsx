import React, { useState } from "react";
import WatchVideo from "./WatchVideo";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ newRecipe, isFavorite, onToggleFavorite }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleRecipeDetails = () => {
    navigate(`/recipe-details/${newRecipe.idMeal}`, { state: newRecipe });
  };

  const handleWatchRecipe = () => {
    setVideoUrl(newRecipe.strYoutube);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <WatchVideo
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="card-body">
        <div className="card-img">
          <img src={newRecipe.strMealThumb} alt={newRecipe.strMeal} />
        </div>
        <div className="card-content">
          <div className="content-block">
            <div className="name-favorite-cluster flex">
              <p className="recipe-name">{newRecipe.strMeal}</p>
              <div className="fav-icon" onClick={onToggleFavorite}>
                <i
                  title="Add to favorites"
                  className={`fa-solid fa-heart ${isFavorite ? "pink" : ""}`}
                ></i>
              </div>
            </div>
            {newRecipe.strArea && (
              <p className="cuisine">
                <span>Cuisine</span>: {newRecipe.strArea}
              </p>
            )}
          </div>
          <div className="btn-cluster ">
            <button className="get-recipe" onClick={handleRecipeDetails}>
              Get Recipe
            </button>

            {newRecipe.strYoutube && (
              <button onClick={handleWatchRecipe} className="watch-recipe">
                Watch Recipe
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
