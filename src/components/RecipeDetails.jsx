import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const location = useLocation();
  const newRecipe = location.state || [];
  const navigate = useNavigate();

  let finalIngredients = Object.keys(newRecipe)
    .filter((x) => x.includes("strIngredient") && newRecipe[x]?.trim())
    .map((x) => newRecipe[x]);

  let finalMeasurements = Object.keys(newRecipe)
    .filter((x) => x.includes("strMeasure") && newRecipe[x]?.trim())
    .map((x) => newRecipe[x]);

  console.log(newRecipe.strInstructions);

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left-long"></i> Back
      </button>
      <p className="recipe-details-title">{newRecipe.strMeal}</p>

      <div className="recipe-details-image">
        <img src={newRecipe.strMealThumb} alt={newRecipe.strMeal} />
      </div>

      <div className="ingredients">
        <p className="section-title">Ingredients</p>
        <ul className="ingredients-list">
          {finalIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient} - {finalMeasurements[index]}
            </li>
          ))}
        </ul>
      </div>

      <div className="instructions">
        <p className="section-title">Instructions</p>
        <ol className="instructions-list">
          {newRecipe.strInstructions.split(/\.\s+/).map((sentence, index) => (
            <li key={index}>{sentence+"."}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
