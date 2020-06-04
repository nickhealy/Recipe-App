import React from 'react'

const IngredientDisplay = ({ name, amount, unit, id}) => {
  return (
    <li className='ingredient' id={id}>
      <span className='ing-name'>{name}   </span>
      :
      <span className='ing-amount'>   {amount} {unit}</span>
    </li>
  )
}

export default IngredientDisplay; 