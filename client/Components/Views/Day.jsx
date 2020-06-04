import React from 'react'
import RecipeDisplay from './RecipeDisplay';

const Day = ({day, recipeList, recipes, toggleRecipeSearch, toggleViewRecipe, removeRecipe}) => {
  const recipeDisplays = [];
  
  recipeList.forEach(recipeId => {

    recipes.forEach(recipe => {
      // for every matching id in the recipes table from the days table, display another recipe
      if (recipeId === recipe._id) {
        recipeDisplays.push(
          <RecipeDisplay 
            title={recipe.title} 
            favorite={recipe.favorite}
            key={recipe._id} 
            id={recipe._id} 
            toggleViewRecipe={toggleViewRecipe}
            removeRecipe={removeRecipe}
            day={day}
            />
        )
      }
    })
  })
  return(
    <div className={`day-display ${day}`}>
      <header className='header'>
        {day}
        {/* on click, set current modal to be recipe search, pass in current day to later invoke setDayInFocus on it */}
        <button className='btn add-recipe' onClick={() => toggleRecipeSearch(day)}>+</button>
      </header>
      <ul>
        {recipeDisplays}
      </ul>
    </div>
  )
}

export default Day; 