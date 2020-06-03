import React from 'react';
import Day from '../Views/Day';

// for rough-draft purposes
const dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const DaysContainer = ({ recipes, days, toggleRecipeSearch }) => {
  // map the recipes array from the days data onto each day
  
  const calendar = dayList.map((day, i)=> {
    return (
      <Day 
      day={day}
      key={day}
      recipeList = {days[i].recipes} 
      recipes={recipes}
      toggleRecipeSearch = {toggleRecipeSearch}
      />
    )
  })

  return(
    <div id='daysContainer'>
      {calendar}
    </div>
  )
}

export default DaysContainer; 