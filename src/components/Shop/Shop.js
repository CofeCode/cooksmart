import { useEffect, useState } from "react";

import { TiDeleteOutline } from "react-icons//ti";
import { VscClearAll } from "react-icons/vsc";

import * as database from "../../database";

import "./Shop.scss";

const Shop = (props) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);

  // Fetch the list of ingredients from the database and update the state accordingly
  useEffect(() => {
    setIngredients([]);

    const loadData = async () => {
      try {
        setLoading(true);
        const data = await database.loadShoppingList();
        setIngredients(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error loading tasks:", error);
      }
    };

    loadData();
  }, []);

  // Deletion of an ingredient
  const handleDeleteClick = async (id) => {
    try {
      await database.deleteIngredient(id);
      const updatedIngredients = ingredients.filter(
        (ingredient) => ingredient.id !== id
      );
      setIngredients(updatedIngredients);
    } catch (error) {
      console.log("Error deleting ingredient:", error);
    }
  };

  // Clearing of the entire shopping list
  const handleClearClick = async () => {
    try {
      await database.clearShoppingList();
      setIngredients([]);
    } catch (error) {
      console.error("Error clearing shopping list:", error);
    }
  };

  return (
    <div className="container">
      <div className="insideContainer">
        <div className="shopContainer">
          {loading ? (
            <p>Loading shopping list...</p>
          ) : (
            <>
              {ingredients.length === 0 ? (
                <p>Your shopping list is empty!</p>
              ) : (
                <ul>
                  {ingredients.map(({ id, ingredient }) => (
                    <p key={id} className="ingredient">
                      <button
                        className="buttonAddDelete"
                        onClick={() => handleDeleteClick(id)}
                      >
                        <TiDeleteOutline className="icon" />
                      </button>
                      {ingredient}
                    </p>
                  ))}
                  <div className="clearButton">
                    <button
                      className="buttonAddDelete"
                      onClick={handleClearClick}
                    >
                      <VscClearAll className="iconClear" />
                    </button>
                  </div>
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
