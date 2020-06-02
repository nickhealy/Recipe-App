const Recipe = require('../models/recipeModel'); 

const recipeController = {};

recipeController.getRecipes = (req, res, next) => {
  // go into db, get all recipes
  Recipe.find({}, (err, data) => {
    if (err) return console.log(err);

    // store recipes on res.locals
    res.locals.recipes = data; 
    return next()
  })
}

recipeController.addRecipe = (req, res, next) => {
  // store body information as variables
  const { title, ingredients, recipe } = req.body; 
  
  // add this information to the DB
  Recipe.create({ title, ingredients, recipe}, (err, recipe) => {
    if (err) return console.log(err);
  
    // move to next piece of middleware
    console.log('added to DB :', recipe)
    return next();
  });
}

module.exports = recipeController; 