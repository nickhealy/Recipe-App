const express = require('express'); 
const recipeController = require('../controllers/recipeController'); 

const router = express.Router(); 

// get all recipes
router.get('/', 
  recipeController.getRecipes,
  (req,res) => res.status(200).json({...res.locals.recipes})
);

// add recipe to db, then get all and send them back
router.post('/', 
  recipeController.addRecipe, 
  recipeController.getRecipes,
  (req, res) => res.status(200).json({...res.locals.recipes})
);

module.exports = router; 