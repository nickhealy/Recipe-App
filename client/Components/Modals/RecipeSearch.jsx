import React from 'react'
import Styles from '../../styles/modalStyles.css'

const RecipeSearch = ({toggleNewRecipe}) => {

  return (
    <div className='modal-container'>
      <div className='modal' id='recipeSearch'>
        <header className='header'>
          Add Recipe
          <button className='btn new-recipe' onClick={toggleNewRecipe}>+</button>
        </header>
        <form>
          <label htmlFor='search-recipes' aria-hidden='true'>Search Recipes</label>
          <input type='text' id='search-recipes' placeholder='Search by Name, Tag, or Ingredient'></input>
        </form>
      </div>
    </div>
  )
}

export default RecipeSearch; 