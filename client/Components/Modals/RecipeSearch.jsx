import React from 'react';
import TagContainer from '../Containers/TagContainer';
import SearchResults from '../Containers/SearchResults'
import Styles from '../../styles/modalStyles.css';


const RecipeSearch = ({toggleNewRecipe, toggleViewSearchedRecipe, updateCurrentSearch, currentSearch, tags, toggleTag, recipes}) => {
  
  return (
    <div className='modal-container'>
      <div className='modal' id='recipeSearch'>
        <header className='header'>
          Add Recipe
          <button className='btn new-recipe' onClick={toggleNewRecipe}>+</button>
        </header>
        <form className='text-input'>
          <label htmlFor='search-recipes' aria-hidden='true'>Search Recipes</label>
          <input 
            type='text' 
            className='modal-text-input'
            id='search-recipes' 
            placeholder='Search by Name, Tag, or Ingredient'
            value = {currentSearch.title}
            onChange={(e) => updateCurrentSearch(e.target.value)}></input>
        </form>
        {/* NOTE: the toggleTag function here uses the same piece of state as the edit Recipe modal */}
        <TagContainer toggleTag={toggleTag} tags={tags}/>
        <SearchResults 
          tags={tags} 
          currentSearch={currentSearch} 
          recipes={recipes} 
          toggleViewSearchedRecipe={toggleViewSearchedRecipe}
          />
      </div>
    </div>
  )
}

export default RecipeSearch; 