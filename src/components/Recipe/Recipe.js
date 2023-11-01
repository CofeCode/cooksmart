import { useState } from "react";

import * as database from "../../database";

import "./Recipe.scss";

import { MdDone } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

function Recipe({ recipe }) {

  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Handle when a step is clicked
  const handleStepClick = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((step) => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  // Handle when an ingredient is added to the shopping list
  const handleAddClick = async (ingredient) => {
    try {
      // Save the ingredient to the database
      const savedIngredient = await database.save({
        ingredient,
        recipeId: recipe.id,
      });

      // console.log("Saved ingredient:", savedIngredient); //-----> ckech if need
      
      // Update the ingredients state variable to include the newly added ingredient
      const updatedIngredients = ingredients.map((item) => {
        if (item.name === ingredient) {
          return {
            name: ingredient,
            inShoppingList: true,
          };
        } else {
          return item;
        }
      });
      setIngredients(updatedIngredients);
    } catch (error) {
      console.log("Error saving ingredient:", error);
    }
  };

  return (
    <div className="container">
      <div className="insideContainer">
        <div className="imagePictureCookTimeCaloriesContainer">
          <img src={recipe.picture} alt={recipe.title} />
          <div>
            <h2>{recipe.title}</h2>
            <div className="propsContainer">
              <div className="props">
                <h3>INGREDIENTS</h3>
                <p>{recipe.IngredientsNum}</p>
              </div>
              <div className="props">
                <h3>TIME</h3>
                <p>{recipe.cookTime}</p>
              </div>
              <div className="props">
                <h3>CALORIES</h3>
                <p>{recipe.calories}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ingridientsContainer">
          <ul>
            <h3>Ingredients</h3>
            {ingredients.map((ingredient) => (
              // Display the ingredient and a button to add it to the shopping list
              <p key={ingredient.name} className="ingredient">
                {ingredient.inShoppingList ? (
                  <MdDone className="iconDone" />
                ) : (
                  <button
                    className="buttonAddDelete"
                    onClick={() => handleAddClick(ingredient.name)}
                  >
                    <IoMdAddCircleOutline className="icon" />
                  </button>
                )}
                {ingredient.name}
              </p>
            ))}
          </ul>
        </div>

        <hr />

        <div className="steps">
          <ul>
            <h3>Steps</h3>
            {recipe.description.map((step, index) => (
              // Display the recipe steps and mark completed steps
              <div
                className={`step ${
                  completedSteps.includes(index) ? "completed" : ""
                }`}
                key={index}
                onClick={() => handleStepClick(index)}
              >
                <span className="stepNumber">{`${index + 1}.`}</span>
                <span className="stepText">{step}</span>
              </div>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Recipe;
