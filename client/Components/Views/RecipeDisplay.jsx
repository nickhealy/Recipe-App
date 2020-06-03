import React from 'react';

const RecipeDisplay = ({ title, ingredients, tags, recipe}) => {
  return(
    <div className='recipe-display'>
      <h5>{title}</h5>
    </div>
  )
}

export default RecipeDisplay; 