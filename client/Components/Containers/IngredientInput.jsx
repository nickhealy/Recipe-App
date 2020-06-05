import React from 'react';
import IngredientDisplay from '../Views/IngredientDisplay'; 

import Styles from '../../styles/modalStyles.css'


const IngredientInput = ({ newIngredient, updateNewIngredient, addNewIngredient, newRecipe}) => {
  // map ingredients based on passed down state
  const ingredients = newRecipe.ingredients.map((ingredient, i) => {
    return (
      <IngredientDisplay
        name={ingredient.name} 
        amount={ingredient.amount} 
        unit={ingredient.unit} 
        id={i} 
        key={`new_ingredient_${i}`} 
        />
    )
  })

  

  // this is a controlled form. it displays whatever is in state, and updates state on any change event
  return (
    <li>
      <header className='header'>
        Ingredients
        <button className='btn new-ingredient' onClick={addNewIngredient}>+</button>
      </header>
      <ul id='ingredients-container'>
        <li className="input-form-container">
          <label htmlFor='add-name' aria-hidden='true'>Name</label>
          <input 
            type='text' 
            id='add-name' 
            className='modal-text-input'
            name='recipe_name' 
            placeholder="e.g. 'Flour', 'Paprika'"
            value={newIngredient.name}
            onChange={(e) => updateNewIngredient('name', e.target.value)}>
          </input>
        </li>
        <li className='input-form-container ingredient-input'>
          <label htmlFor='add-ingredient-amount-name' aria-hidden='true' className='amount-input'>
            Amount
            <input 
              id='add-ingredient-amount-name' 
              className='modal-text-input'
              type='text' 
              value={newIngredient.amount}
              onChange={(e) => updateNewIngredient('amount', e.target.value)}
              placeholder='Enter fractions as decimals'>
            </input>
          </label>
          <label htmlFor='add-ingredient-amount-unit' aria-hidden='true' className='unit-input'>Unit
            <select  
              id='add-ingredient-amount-unit' 
              className='modal-text-input'
              name='recipe_amount' 
              placeholder="e.g. 'lbs', 'oz.'"
              value={newIngredient.unit}
              onChange={(e) => updateNewIngredient('unit', e.target.value)}>
              <option value=''></option>
              <option value='lbs'>lbs</option>
              <option value='oz'>oz</option>
              <option value='cps'>cps</option>
              <option value='g'>g</option>
              <option value='tsp'>tsp</option>
              <option value='tbsp'>tbsp</option>
              <option value='ml'>ml</option>
              <option value='mg'>lbs.</option>
              <option value='bag'>bag</option>
              <option value='no-unit'>no-unit</option>
              <option value='carton'>carton</option>
              <option value='cans'>cans</option>
            </select>
          </label>
        </li>
        <ul id='ingredient-list'>{ingredients}</ul>
      </ul>
    </li>
  )
}

export default IngredientInput; 

