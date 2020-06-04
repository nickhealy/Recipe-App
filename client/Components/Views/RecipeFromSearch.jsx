import React from 'react'

const RecipeFromSearch = ({ title, ingredients, favorite, tags, recipe, notes, toggleViewSearchedRecipe, _id }) => {

  return (
    <li className='search-result flex' onClick={() => toggleViewSearchedRecipe(_id)}>
      <div>
        <b><i>{title}</i></b>
        {favorite ? <span className='favorite'>F</span> : ''}
      </div>
      {tags.length > 0 ? <i>tags: {tags}</i> : ''}
    </li>
  )
}

export default RecipeFromSearch; 