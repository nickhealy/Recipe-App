import React from 'react'

const ListItem = ({ name, amount, unit }) => {
  
  return (
    <li className='shopping-list-item'>{name} : {amount} {unit} </li>
  )
}

export default ListItem; 