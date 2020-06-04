import React from 'react';
import IngredientDisplay from '../Views/IngredientDisplay';

const ViewRecipe = ({ recipe, toggleEditRecipe }) => {
  const ingredients = recipe.ingredients.map((ingredient, i) => {
    return <IngredientDisplay name={ingredient.name} amount={ingredient.amount} id={i} key={`new_ingredient_${i}`} />
  })

  return (
    <div className='modal-container'>
      <div className='modal' id='recipeSearch'>
        <header className='header'>
          {recipe.title}
          <button onClick={toggleEditRecipe}>Edit</button>
        </header>
          <div id='link-container'>
            <i>From {recipe.recipe}</i>
            <a href={`http://${recipe.recipe}`} target='_blank'><button>Go To Recipe</button></a>
          </div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients}
        </ul>
        <h3>Notes</h3>
        <p><i>{recipe.notes}</i></p>
      </div>
    </div>
  );
};

export default ViewRecipe; 