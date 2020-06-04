import React from 'react'

const IngredientDisplay = ({ name, amount, id}) => {
  return (
    <li className='ingredient' id={id}>
      <span className='ing-name'>{name}   </span>
      :
      <span className='ing-amount'>   {amount}</span>
    </li>
  )
}

export default IngredientDisplay; 