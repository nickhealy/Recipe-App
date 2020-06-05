import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const RecipeFromSearch = ({ title, ingredients, favorite, tags, recipe, notes, toggleViewSearchedRecipe, _id }) => {

  return (
    <li className='search-result flex' onClick={() => toggleViewSearchedRecipe(_id)}>
      <div>
        <b><i>{title}</i></b>
        {favorite ? <FontAwesomeIcon icon={faStar} className='star'/> : ''}
      </div>
    </li>
  )
}

export default RecipeFromSearch; 