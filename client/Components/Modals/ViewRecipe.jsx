import React from 'react';
import IngredientDisplay from '../Views/IngredientDisplay';
import Tag from '../Views/Tag';

const ViewRecipe = ({ recipe, toggleEditRecipe }) => {
  // map ingredients from recipeInFocus into UI
  const ingredients = recipe.ingredients.map((ingredient, i) => {
    return (
      <IngredientDisplay 
        name={ingredient.name} 
        amount={ingredient.amount} 
        unit={ingredient.unit}
        id={i} 
        key={`new_ingredient_${i}`} />
    )
  })

  // map tags from recipeInFocus into UI
  const tags = recipe.tags.map((tag, i) => {
    return (
      <Tag 
        status={true}
        name={tag}
        key={`tag_${name}`}
        toggleTag={null} />
    )
  })

  return (
    <div className='modal-container'>
      <div className='modal' id='recipeSearch'>
        <header className='header'>
          {recipe.title}
          {/* conditionally render favorite's graphic */}
          {recipe.favorite ? <span className='favorite'>FAV</span> : ''}
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
        <h3>Tags</h3>
        <ul className='tag-container'>
          {tags}
        </ul>
        <h3>Notes</h3>
        <p><i>{recipe.notes}</i></p>
      </div>
    </div>
  );
};

export default ViewRecipe; 