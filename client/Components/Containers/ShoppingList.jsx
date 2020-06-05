import React from 'react';
import ListItem from '../Views/ListItem';

const ShoppingList = ({ days, recipes }) => {
  const cache = {};
  // go through days, and access each day's recipe array
  days.forEach(day => {
    // for each recipe in that array, find the corresponding recipe info from the recipes array
    day.recipes.forEach(recipeId => {
     
      recipes.forEach(recipe => {
        
        if (recipeId === recipe._id) {
          // once we are at our desired recipe, iterate through ingredients, storing them in a cache (We will worry about overlaps later)
          recipe.ingredients.forEach(ingredient => {
            // if ingredient already exists in cache, and the units match up, add amount of ingredient to amount of that ingredient already in the cache
            // parse amount, make name lowercase for sake of calculations and formatting
            const cachedIng = ingredient.name.toLowerCase();
            const cachedAmt = parseFloat(ingredient.amount);

            if (cache[cachedIng] && cache[cachedIng].unit === ingredient.unit) {
              cache[cachedIng].amount += cachedAmt

              // if it doesn't, add the ingredient information as new entry in cache
            } else {
              cache[cachedIng] = { 
                amount : cachedAmt, 
                unit : ingredient.unit
              }
            }
          })
        }

      })
    })
  })
  
  // from our cache, we generate our formatted list
  const list = []; 

  for (const key in cache) {
    list.push(
      <ListItem name={key} amount={cache[key].amount} unit={cache[key].unit === 'no-unit' ? '' : cache[key].unit} key={key} />
    )
  }

  return(
    <div className='modal-container'>
      <div className='modal'>
        <header className='header' id='shopping-list'>
          Shopping List
        </header>
        <ul id='shopping-list-container'>
          {list}
        </ul>
      </div>
    </div>
  )
}

export default ShoppingList; 