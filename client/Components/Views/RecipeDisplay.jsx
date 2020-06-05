import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const RecipeDisplay = ({ title, toggleViewRecipe, removeRecipe, id, day, favorite}) => {
  // use local state to determine whether button should be visible (i.e. if user has hovered over recipe)
  const [deleteVisible, toggleDeleteVisible] = useState(false)

  const deleteButton = <button className={`btn btn-delete ${deleteVisible ? 'visible' : 'hidden'}`} onClick={(e) => removeRecipe(e, id, day)}>&times;</button>
  return(
    <li 
      className={'recipe-display'}
      onClick={() => toggleViewRecipe(id, day)}
      onMouseOver={() => toggleDeleteVisible(true)}
      onMouseOut={() => toggleDeleteVisible(false)}>
      {title}
      {favorite ? <FontAwesomeIcon icon={faStar} />: ''}
      {deleteButton}
    </li>
  )
}

export default RecipeDisplay; 