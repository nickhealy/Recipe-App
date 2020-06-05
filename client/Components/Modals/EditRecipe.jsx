import React from 'react'
import IngredientInput from '../Containers/IngredientInput';
import TagContainer from '../Containers/TagContainer';

const EditRecipe = ({ newRecipe, updateNewRecipe, newIngredient, updateNewIngredient, addNewIngredient, editRecipe, deleteRecipe, toggleFavorites, toggleTag, tags, day, newFavorite  }) => {
  
  return (
    <div className='modal-container'>
      <div className='modal' id='editRecipe'>
        <header className='header'>
          Edit Recipe
        </header>
        <form className='modal-form' onSubmit={(e) => editRecipe(e, newRecipe._id)}>
          <ul>
            <li className='input-form-container'>
              <label htmlFor='add-name' aria-hidden='true'>Title of Recipe</label>
              <input 
                type='text' 
                id='add-name' 
                className='modal-text-input'
                name='recipe_name' 
                placeholder="What's your recipe called?" 
                value={newRecipe.title} 
                onChange={(e) => updateNewRecipe('title', e.target.value)} 
                required >
              </input>
            </li>
            <li className='input-form-container'>
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
            {/* INGREDIENTS -- a separate list of components rendered from state passed through props */}
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
            <div className='flex'>
              <button onClick={() => toggleFavorites()} className='submit md' id='add-to-favs'>
              {newFavorite? 'Remove from Favorites' : 'Add To Favorites'}
              </button>
              <button type='submit' className='submit md' id='add-recipe'>Save</button>
              <button type='submit' className='submit delete md' id='add-recipe' onClick={(e) => deleteRecipe(e, newRecipe._id, day)}>Delete Recipe</button>
            </div>
          </ul>
        </form>
      </div>
    </div>
  )
}

export default EditRecipe; 