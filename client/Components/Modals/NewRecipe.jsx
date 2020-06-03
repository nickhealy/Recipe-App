import React from 'react'
import Styles from '../../styles/modalStyles.css'

const NewRecipe = ({ newRecipe, updateNewRecipe }) => {

  return (
    <div className='modal-container'>
      <div className='modal' id='newRecipe'>
        <header className='header'>
          New Recipe
          {/* <button className='btn new-recipe' onClick={toggleNewRecipe}>+</button> */}
        </header>
        <form className='modal-form'>
          <ul>
            <li>
              <label htmlFor='add-name' aria-hidden='true'>Title of Recipe</label>
              <input 
                type='text' 
                id='add-name' 
                name='recipe_name' 
                placeholder="What's your recipe called?" 
                value={newRecipe.title} 
                onChange={(e) => updateNewRecipe('title', e.target.value)} 
                required >
              </input>
            </li>
            <li>
              <label htmlFor='add-recipe-link' aria-hidden='true'>Recipe Link</label>
              <input 
                type='text' 
                id='add-recipe-link' 
                name='recipe_link' 
                value={newRecipe.recipe} 
                onChange={(e) => updateNewRecipe('recipe', e.target.value)}
                placeholder="Where can we find this recipe?">
              </input>
            </li>
            <li>
              <header className='header'>
                Ingredients
                <button className='btn new-ingredient'>+</button>
              </header>
              <ul id='ingredients-container'>
                <li>
                  <label htmlFor='add-name' aria-hidden='true'>Ingredient Name</label>
                  <input 
                    type='text' 
                    id='add-name' 
                    name='recipe_name' 
                    placeholder="e.g. 'Flour', 'Paprika'">
                  </input>
                </li>
                <li>
                  <label htmlFor='add-ingredient-amount' aria-hidden='true'>Amount</label>
                  <input type='text' id='add-ingredient-amount' name='recipe_link' placeholder="e.g. 'lbs', 'oz.'"></input>
                </li>
              </ul>
            </li>
            <li>
              <header className='header'>
                Tags
              </header>
              <ul id='tags-container'>
                {/* hard-coded for now, will add later on */}
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
                <button>TAG</button>
              </ul>
            </li>
            <li>
              <label htmlFor='add-notes' aria-hidden='true'>Notes</label>
              <textarea 
                placeholder="Is there anything you wished you knew the first time you made this?"
                value={newRecipe.notes} 
                onChange={(e) => updateNewRecipe('notes', e.target.value)}>
              </textarea>
            </li>
            <button type='submit' className='submit' id='add-recipe'>Add Recipe</button>
          </ul>
        </form>
      </div>
    </div>
  )
}

export default NewRecipe;