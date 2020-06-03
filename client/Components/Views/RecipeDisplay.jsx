import React from 'react';

const RecipeDisplay = ({ title, ingredients, tags, recipe}) => {
  return(
    <li className='recipe-display'>
      {title}
    </li>
  )
}

export default RecipeDisplay; 