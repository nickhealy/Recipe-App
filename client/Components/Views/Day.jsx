import React from 'react'
import RecipeDisplay from './RecipeDisplay';

const Day = ({day, recipeList, recipes}) => {
  const recipeDisplays = [];
  
  recipeList.forEach(recipeId => {

    recipes.forEach(recipe => {
      // for every matching id in the recipes table from the days table, display another recipe
      if (recipeId === recipe._id) {
        recipeDisplays.push(
          <RecipeDisplay title={recipe.title} key={recipe._id} />
        )
      }
    })
  })
  return(
    <div className='day-display'>
      <header>{day}</header>
      <ul>
        {recipeDisplays}
      </ul>
    </div>
  )
}

export default Day; 