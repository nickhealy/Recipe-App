import React from 'react';
import IngredientDisplay from '../Views/IngredientDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Tag from '../Views/Tag';

const ViewSearchedRecipe = ({ recipe, toggleEditRecipe, addRecipeFromSearch }) => {
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
        <header className='header' id='view-search-header'>
          <span className='view-searched-header-text'>
            {recipe.title}
            {recipe.favorite ? <FontAwesomeIcon className='star' icon={faStar} /> : ''}
          </span>
        </header>
          <div id='link-container'>
            <i>From {recipe.recipe}</i>
            <a href={`http://${recipe.recipe}`} target='_blank'><button className='submit full-recipe'>Go To Full Recipe</button></a>
          </div>
        <h3 className="ing-header">{ingredients.length > 0 ? 'Ingredients' : ''}</h3>
        <ul className='rendered-ing-list'>
          {ingredients}
        </ul>
        <h3 className="ing-header">{tags.length > 0 ? 'Tags' : ''}</h3>
        <ul className='tag-container'>
          {tags}
        </ul>
        <h3 className="ing-header">{recipe.notes ? 'Notes' : ''}</h3>
        <p id='notes'><i>{recipe.notes}</i></p>
        <div className='btns-container'>
          <button onClick={toggleEditRecipe} className='submit go-to-edit'>Edit Recipe</button>
          <button className='submit add-to-cal' onClick={addRecipeFromSearch}>Add Recipe</button>
        </div>
          <button className='submit go-back'>Back To Results</button>
      </div>
    </div>
  );
};

export default ViewSearchedRecipe; 