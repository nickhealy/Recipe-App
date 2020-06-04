import React, { useState } from 'react';

const RecipeDisplay = ({ title, toggleViewRecipe, removeRecipe, id, day, favorite}) => {
  // use local state to determine whether button should be visible (i.e. if user has hovered over recipe)
  const [deleteVisible, toggleDeleteVisible] = useState(false)
  console.log('favorite is :', favorite )
  const deleteButton = <button className='btn btn-delete' onClick={(e) => removeRecipe(e, id, day)}>&times;</button>
  return(
    <li 
      className='recipe-display' 
      onClick={() => toggleViewRecipe(id, day)}
      onMouseOver={() => toggleDeleteVisible(true)}
      onMouseOut={() => toggleDeleteVisible(false)}>
      {title}
      {favorite ? <span className='favorite'>F</span> : ''}
      {deleteButton}
    </li>
  )
}

export default RecipeDisplay; 