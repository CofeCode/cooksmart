import React from "react";
import "./RecipeCards.scss";
import { NavLink } from "react-router-dom";


function RecipeCards({ recipes }) {
  return (
    <>
      <div className="container">
        <div className="recipeCardsContainer">
          <div className="recipeCards">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipeCardsImageContainer">
                <NavLink to={`/recipe/${recipe.id}`} activeclassname="active">
                  <img src={recipe.picture} alt={recipe.title} />
                  <div className="title">{recipe.title}</div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeCards;
