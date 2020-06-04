import React, { useState } from 'react';

const RecipeDisplay = ({ title, toggleViewRecipe, removeRecipe, id, day}) => {
  // use local state to determine whether button should be visible (i.e. if user has hovered over recipe)
  const [deleteVisible, toggleDeleteVisible] = useState(false)

  const deleteButton = <button className='btn btn-delete' onClick={(e) => removeRecipe(e, day, id)}>&times;</button>
  return(
    <li 
      className='recipe-display' 
      onClick={() => toggleViewRecipe(id)}
      onMouseOver={() => toggleDeleteVisible(true)}
      onMouseOut={() => toggleDeleteVisible(false)}>
      {title}
      {deleteButton}
    </li>
  )
}

export default RecipeDisplay; 