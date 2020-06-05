import React from 'react';
import TagContainer from '../Containers/TagContainer';
import IngredientInput from '../Containers/IngredientInput';

import Styles from '../../styles/modalStyles.css'



const NewRecipe = ({ newRecipe, updateNewRecipe, newIngredient, updateNewIngredient, addNewIngredient, addRecipe, toggleTag, tags }) => {

  return (
    <div className='modal-container'>
      <div className='modal' id='newRecipe'>
        <header className='header'>
          New Recipe
          {/* <button className='btn new-recipe' onClick={toggleNewRecipe}>+</button> */}
        </header>
        <form className='modal-form' onSubmit={addRecipe}>
          <ul>
            <li class='input-form-container'>
              <label htmlFor='add-name' aria-hidden='true'>Title of Recipe</label>
              <input 
                className='modal-text-input'
                type='text' 
                id='add-name' 
                name='recipe_name' 
                placeholder="What's your recipe called?" 
                value={newRecipe.title} 
                onChange={(e) => updateNewRecipe('title', e.target.value)} 
                required >
              </input>
            </li>
            <li class='input-form-container'>
              <label htmlFor='add-recipe-link' aria-hidden='true'>Recipe Link</label>
              <input 
                type='text' 
                className='modal-text-input'
                id='add-recipe-link' 
                name='recipe_link' 
                value={newRecipe.recipe} 
                onChange={(e) => updateNewRecipe('recipe', e.target.value)}
                placeholder="Where can we find this recipe?">
              </input>
            </li>
            {/* INGREDIENTS -- a controlled form that sends ingredients up to state and displays them as props */}
            <IngredientInput 
              newIngredient={newIngredient} 
              updateNewIngredient={updateNewIngredient} 
              addNewIngredient={addNewIngredient} 
              newRecipe={newRecipe}
              />
            <li>
              <TagContainer toggleTag={toggleTag} tags={tags}/>
            </li>
            <li className='add-notes'>
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