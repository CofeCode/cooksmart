import React from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import RecipeCard from "../../components/RecipyCard/RecipyCard";

export default function RecipyCardPage({
  recipes,
  handleAddToShoppingList,
  handleDeleteFromShoppingList,
}) {
  return (
    <PageContainer title="Recipe">
      <RecipeCard
        recipes={recipes}
        handleAddToShoppingList={handleAddToShoppingList}
        handleDeleteFromShoppingList={handleDeleteFromShoppingList}
      />
    </PageContainer>
  );
}
