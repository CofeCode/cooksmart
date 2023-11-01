import React from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import RecipeCards from "../../components/RecipeCards/RecipeCards";
import Header
 from "../../components/Header/Header";
export default function RecipeCardsPage({ recipes, handleAddToShoppingList,handleDeleteFromShoppingList }) {
  return (
    <>
    <Header/>
    <PageContainer title="Find Your Dish">
      <RecipeCards
        recipes={recipes}
        handleAddToShoppingList={handleAddToShoppingList}
        handleDeleteFromShoppingList={handleDeleteFromShoppingList}
      />
    </PageContainer></>
  );
}
