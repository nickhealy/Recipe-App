import React from 'react'
import IngredientDisplay from '../Views/IngredientDisplay';
import TagContainer from '../Containers/TagContainer';

const EditRecipe = ({ newRecipe, updateNewRecipe, newIngredient, updateNewIngredient, addNewIngredient, editRecipe, deleteRecipe, toggleTag, tags  }) => {
  const ingredients = newRecipe.ingredients.map((ingredient, i) => {
    return <IngredientDisplay name={ingredient.name} amount={ingredient.amount} id={i} key={`new_ingredient_${i}`} />
  })
  return (
    <div className='modal-container'>
      <div className='modal' id='editRecipe'>
        <header className='header'>
          Edit Recipe
          {/* <button className='btn new-recipe' onClick={toggleNewRecipe}>+</button> */}
        </header>
        <form className='modal-form' onSubmit={(e) => editRecipe(e, newRecipe._id)}>
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
            {/* INGREDIENTS -- a separate list of components rendered from state passed through props */}
            <li>
              <header className='header'>
                Ingredients
                <button className='btn new-ingredient' onClick={addNewIngredient}>+</button>
              </header>
              <ul id='ingredients-container'>
                <li>
                  <label htmlFor='add-name' aria-hidden='true'>Ingredient Name</label>
                  <input 
                    type='text' 
                    id='add-name' 
                    name='recipe_name' 
                    placeholder="e.g. 'Flour', 'Paprika'"
                    value={newIngredient.name}
                    onChange={(e) => updateNewIngredient('name', e.target.value)}>
                  </input>
                </li>
                <li>
                  <label htmlFor='add-ingredient-amount' aria-hidden='true'>Amount</label>
                  <input 
                    type='text' 
                    id='add-ingredient-amount' 
                    name='recipe_link' 
                    placeholder="e.g. 'lbs', 'oz.'"
                    value={newIngredient.amount}
                    onChange={(e) => updateNewIngredient('amount', e.target.value)}>
                  </input>
                </li>
                <ul id='ingredient-list'>{ingredients}</ul>
              </ul>
            </li>
            <li>
            <li>
              <TagContainer toggleTag={toggleTag} tags={tags}/>
            </li>
            </li>
            <li>
              <label htmlFor='add-notes' aria-hidden='true'>Notes</label>
              <textarea 
                placeholder="Is there anything you wished you knew the first time you made this?"
                value={newRecipe.notes} 
                onChange={(e) => updateNewRecipe('notes', e.target.value)}>
              </textarea>
            </li>
            <div className='flex'>
              <button type='submit' className='submit' id='add-recipe'>Save</button>
              <button type='submit' className='submit delete' id='add-recipe' onClick={deleteRecipe}>Delete Recipe</button>
            </div>
          </ul>
        </form>
      </div>
    </div>
  )
}

export default EditRecipe; 