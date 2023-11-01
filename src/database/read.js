import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

// Load recipes data from Firestore database and update with shopping list information
export async function loadRecipes() {
  try {
    // Get recipe documents from Firestore database
    const recipesSnapshot = await getDocs(collection(db, "recipes"));

    // Get shopping list documents from Firestore database
    const shoppingListSnapshot = await getDocs(collection(db, "shoppingList"));

    // Extract shopping list data from shopping list documents
    const shoppingListData = shoppingListSnapshot.docs.map((doc) => doc.data());

    // Extract ingredient names from shopping list data and add to a Set to remove duplicates
    const shoppingListIngredients = new Set(
      shoppingListData.map((item) => item.ingredient)
    );

    // Extract recipe data from recipe documents and update with shopping list information
    const data = recipesSnapshot.docs.map((doc) => {
      const recipe = { ...doc.data(), id: doc.id, addedIngredients: [] };

      // Extract ingredient names from recipe data and update with information on whether they are in the shopping list
      recipe.ingredients = recipe.ingredients.map((ingredient) => {
        const inShoppingList = shoppingListIngredients.has(ingredient);
        return {
          name: ingredient,
          inShoppingList: inShoppingList,
        };
      });
      return recipe;
    });
    return data;
  } catch (error) {
    console.log("Error loading recipes:", error);
    return [];
  }
}

// Load shopping list data from Firestore database
export async function loadShoppingList() {
  try {
    // Get shopping list documents from Firestore database
    const querySnapshot = await getDocs(collection(db, "shoppingList"));
    const data = [];

    // Extract data from shopping list documents and add to an array
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  } catch (err) {
    throw new Error("Failed to load the database.");
  }
}
