import React from 'react'; 
import RecipeFromSearch from '../Views/RecipeFromSearch';

const SearchResults = ({ recipes, currentSearch, tags, toggleViewSearchedRecipe}) => {
  // this will generate our search results
  // created a Regex that will be our search -- will find everything if currentSearch is empty
  const search = currentSearch ? new RegExp(currentSearch, 'i') : /.*/i;

  const checkTags = (checkedTags) => {
    // loop through a selected tags, if ever a tag is not present in current recipe's tag list, return false
    // at end of loop, if false has not yet been returned, return true
    for (let i = 0; i < tags.length; i++) {
      if (!checkedTags.includes(tags[i])) return false
    }

    return true
  }
  // we want to display favorites in front of everything else, so we will keep them in separate array
  // if search is empty, should send ALL favorites
  // if search is not, then it will send back favorites relevant to that search

  // put recipes that match search but aren't favs in results array
  const favorites = [];
  const results =[];
  
  recipes.forEach(recipe => {
    if (search.test(recipe.title) && checkTags(recipe.tags)) {

      // if recipe is a favorite, put it into favorites array
      if (recipe.favorite) {
        favorites.push(recipe)
      // otherwise, just add it to results array
      } else {
        results.push(recipe)
      }
    }
  })

  // map favorites and other results onto JSX elements
  const favoriteResults = favorites.map((favorite, i)=> {
    return <RecipeFromSearch {...favorite} toggleViewSearchedRecipe={toggleViewSearchedRecipe} key={`search_fav_${i}`}/>
  })

  const otherResults = results.map((result, i) => {
    return <RecipeFromSearch {...result} toggleViewSearchedRecipe={toggleViewSearchedRecipe} key={`search_result_${i}`}/>
  })

  return(
    <ul id='results-container'>
      {favoriteResults}
      {otherResults}
    </ul>
  )
}

export default SearchResults; 