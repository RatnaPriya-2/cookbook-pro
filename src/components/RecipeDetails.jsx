import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WatchVideo from "./WatchVideo";

const RecipeDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [newRecipe, setNewRecipe] = useState(location.state || null);
  const [isLoading, setIsLoading] = useState(!newRecipe);
  const [videoUrl, setVideoUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!newRecipe || !newRecipe.strInstructions) {
      const fetchRecipe = async () => {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          if (data.meals) setNewRecipe(data.meals[0]);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id, newRecipe]);

  if (isLoading) {
    return <div style={{ fontSize: "22px", fontWeight: "600", textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  if (!newRecipe) {
    return <div style={{ fontSize: "22px", fontWeight: "600", textAlign: "center", marginTop: "50px" }}>Recipe not found.</div>;
  }



  let finalIngredients = Object.keys(newRecipe)
    .filter((x) => x.includes("strIngredient") && newRecipe[x]?.trim())
    .map((x) => ({
      ingredient: newRecipe[x],
      measurement: newRecipe[`strMeasure${x.replace("strIngredient", "")}`] || ""
    }));
  const handleWatchRecipe = () => {
    setVideoUrl(newRecipe.strYoutube);
    setIsOpen(!isOpen);
  };

  return (

    <div className="recipe-details-container">
      <WatchVideo
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left-long"></i> Back
      </button>
      <p className="recipe-details-title">{newRecipe.strMeal}</p>

      <div className="recipe-details-image" style={{ position: "relative" }}>
        <img src={newRecipe.strMealThumb} alt={newRecipe.strMeal} />

        {newRecipe.strYoutube && (
          <button onClick={handleWatchRecipe} className="watch-btn-primary" >
            Watch Recipe
          </button>
        )}
      </div>

      <div className="ingredients">
        <p className="section-title">Ingredients</p>
        <ul className="ingredients-list">
          {finalIngredients.map((item, index) => (
            <li key={index}>
              {item.ingredient} - {item.measurement}
            </li>
          ))}
        </ul>
      </div>

      <div className="instructions">
        <p className="section-title">Instructions</p>
        <ol className="instructions-list">
          {newRecipe.strInstructions?.split(/\.\s+/).filter(Boolean).map((sentence, index) => (
            <li key={index}>{sentence.trim()}</li>
          ))}
        </ol>
      </div>
    </div >
  );
};

export default RecipeDetails;
