const { Recipe } = require('../models/index'); 

const recipeController = {};

recipeController.getRecipes = (req, res, next) => {
  // go into db, get all recipes
  Recipe.find({}, (err, data) => {
    if (err) return next({
      log: `Error with recipeController.getRecipes, error: ${err}`,
      message: 'Error. Check server log for details'
    });

    // store recipes on res.locals
    res.locals.recipes = data; 
    return next()
  })
}

recipeController.addRecipe = (req, res, next) => {
  // store body information as variables
  const { title, ingredients, recipe, notes, favorite, tags } = req.body; 
  // add this information to the DB
  Recipe.create({ title, ingredients, recipe, notes, favorite, tags}, (err, recipe) => {
    if (err) return next({
      log: `Error with recipeController.addRecipe, error: ${err}`,
      message: 'Error. Check server log for details'
    });
    // store unique id in res locals so we can add it to recipes array on the desired day
    res.locals.newRecipeId = recipe._id;
    
    // move to next piece of middleware
    return next();
  });
}

recipeController.deleteRecipe = (req, res, next) => {
  const id = req.params.id; 
  
  // delete DB with passed in ID from DB
  Recipe.findByIdAndRemove(id, (err, deleted) => {
    if (err) return next({
      log: `Error with recipeController.deleteRecipe, err: ${err}`,
      message: 'Error. Check server log for details'
    });

  // move onto next piece of middleware
    return next();
  })
}

recipeController.editRecipe = (req, res, next) => {
  const id = req.params.id; 
  // store body info as variables
  const { title, ingredients, recipe, notes, tags, favorite } = req.body; 

  // edit desired recipe in DB with passed
  Recipe.findByIdAndUpdate(id, { title, ingredients, recipe, notes, tags, favorite }, (err, recipe) => {
    if (err) return next({
      log: `Error with recipeController.editRecipe, err: ${err}`,
      message: 'Error. Check server log for details'
    });

    console.log('updated recipe :', recipe); 
    return next();
  })
}

module.exports = recipeController; 