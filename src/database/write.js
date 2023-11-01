import { db } from "./config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore";

// Saves an ingredient to the shoppingList collection in the database
export async function save(ingredient) {
  try {
    // Add the ingredient document to the shoppingList collection in the database
    const docRef = await addDoc(collection(db, "shoppingList"), ingredient);

    //console.log("Document written with ID: ", docRef.id); //----->check if need

    // Add the ID of the new document to the ingredient object
    ingredient.id = docRef.id; // add the ID returned by Firebase to the task object
    return ingredient;
  } catch (e) {
    throw new Error("Error adding document: " + e);
  }
}

// Deletes an ingredient from the shoppingList collection in the database
export async function deleteIngredient(id) {
  try {
    // Get a reference to the ingredient document to be deleted
    const ingredient = doc(db, "shoppingList", id);

    //console.log("Document written with ID: ", id); //----->check if need

    // Delete the document
    await deleteDoc(ingredient);
  } catch (error) {
    throw new Error("Failed to delete the ingredient.");
  }
}

// Clears all the ingredients from the shopping list collection in the database
export async function clearShoppingList() {
  try {
    // Get a reference to the shoppingList collection
    const shoppingListRef = collection(db, "shoppingList");

    // Get all the documents in the shoppingList collection
    const querySnapshot = await getDocs(shoppingListRef);

    // Loop through each document and delete it
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    //console.log("Shopping list cleared."); //----->check if need
  } catch (error) {
    throw new Error("Failed to clear shopping list.");
  }
}