import React from 'react';
import IngredientDisplay from '../Views/IngredientDisplay';
import Tag from '../Views/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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
        <header className='header view-searched-header-text' id='edit-recipe-header'>
          {recipe.title}
          {/* conditionally render favorite's graphic */}
          {recipe.favorite ? <FontAwesomeIcon icon={faStar} className='star'/> : ''}
        </header>
        <div id='link-container'>
          <i>From {recipe.recipe}</i>
          <a href={`http://${recipe.recipe}`} target='_blank'><button className='submit full-recipe'>Go To Recipe</button></a>
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
        <button onClick={toggleEditRecipe} className='submit go-to-edit' id='edit-btn-view-recipe'>Edit Recipe</button>
      </div>
    </div>
  );
};

export default ViewRecipe; 