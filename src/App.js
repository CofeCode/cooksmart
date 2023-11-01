import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Components
import MainMenu from "./components/MainMenu/MainMenu";
import ShopPage from "./pages/ShopPage/ShopPage";
import RecipyCardPage from "./pages/RecipyCardPage/RecipyCardPage";
import RecipeCardsPage from "./pages/RecipeCardsPage/RecipeCardsPage";

// Database
import * as database from "./database";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shoppingList, setShoppingList] = useState([]);

  // Load database and set up recipes state variable
  useEffect(() => {
    setRecipes([]);

    (async () => {
      try {
        setLoading(true);
        // load data from database
        const data = await database.loadRecipes();
        // update recipes state variable with loaded data
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error loading tasks:", error);
      }
    })();
  }, []);

  // Function to add an ingredient to the shopping list
  const handleAddToShoppingList = async (ingredient, recipe) => {
    try {
      const savedIngredient = await database.save({
        // save the ingredient to the database
        ingredient,
        recipeId: recipe.id,
      });
      console.log("Saved ingredient:", savedIngredient);
      // update the shoppingList state variable with the saved ingredient
      setShoppingList((prevState) => [...prevState, savedIngredient]);
    } catch (error) {
      console.log("Error saving ingredient:", error);
    }
  };

  // Function to delete an item from the shopping list
  const handleDeleteFromShoppingList = (item) => {
    const updatedList = shoppingList.filter(
      (ingredient) => ingredient.ingredientId !== item.ingredientId
    );
    // update the shoppingList state variable with the filtered list
    setShoppingList(updatedList);
  };

  // Function to clear the shopping list
  const handleClearClick = async () => {
    try {
      // clear the shopping list in the database
      await database.clearShoppingList();
      // update the shoppingList state variable to an empty array
      setShoppingList([]);
    } catch (error) {
      console.error("Error clearing shopping list:", error);
    }
  };

  // Update recipes state variable every 5 seconds (need for status of recipe ingredients)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await database.loadRecipes();
        setRecipes(data);
      } catch (error) {
        console.log("Error loading recipes:", error);
      }
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="appContainer">
      <MainMenu />
      <Routes>
        <Route
          path="/"
          element={
            <RecipeCardsPage
              recipes={recipes}
              handleAddToShoppingList={handleAddToShoppingList}
              handleDeleteFromShoppingList={handleDeleteFromShoppingList}
            />
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <RecipyCardPage
              recipes={recipes}
              handleAddToShoppingList={handleAddToShoppingList}
              handleDeleteFromShoppingList={handleDeleteFromShoppingList}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopPage
              shoppingList={shoppingList}
              setShoppingList={setShoppingList}
              handleDeleteFromShoppingList={handleDeleteFromShoppingList}
              handleClearClick={handleClearClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
