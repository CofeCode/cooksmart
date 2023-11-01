import React from "react";
import Recipe from "../Recipe/Recipe";
import { useParams } from "react-router-dom";

function RecipyCard({
  recipes,
  handleAddToShoppingList,
  handleDeleteFromShoppingList,
  shoppingList,
}) {
  const { id } = useParams();

  const filteredRecipes = recipes.filter((recipe) => recipe.id === id);

  return (
    <>
      {filteredRecipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          handleAddToShoppingList={handleAddToShoppingList}
          handleDeleteFromShoppingList={handleDeleteFromShoppingList}
          shoppingList={shoppingList}
        />
      ))}
    </>
  );
}

export default RecipyCard;
