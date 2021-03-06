const express = require('express'); 
const recipeController = require('../controllers/recipeController'); 
const weekdayController = require('../controllers/weekdayController');

const router = express.Router(); 

// get all recipes
router.get('/', 
  recipeController.getRecipes,
  weekdayController.getDays,
  (req,res) => res.status(200).json({
    recipes : [...res.locals.recipes],
    days: [...res.locals.days]
  })
);

// add recipe to db, then get all and send them back
router.post('/:day', 
  recipeController.addRecipe,
  recipeController.getRecipes,
  weekdayController.addToDay,
  weekdayController.getDays,
  (req, res) => res.status(200).json({
    recipes : [...res.locals.recipes],
    days: [...res.locals.days]
  })
);

// updates how many recipes are in each day
router.put('/day',
  weekdayController.updateDays,
  weekdayController.getDays,
  (req, res) => res.status(200).json({
    days: [...res.locals.days]
  })
)

router.put('/:day/:id', 
  weekdayController.addToDay,
  weekdayController.getDays,
  recipeController.getRecipes,
  (req, res) => res.status(200).json({
    recipes : [...res.locals.recipes],
    days: [...res.locals.days]
  })
)

// deletes recipe from db
router.delete('/:id', 
  (req, res, next) => { 
    console.log('routed!');
    return next();
  },
  recipeController.deleteRecipe,
  weekdayController.updateDays,
  weekdayController.getDays,
  recipeController.getRecipes,
  (req,res) => res.status(200).json({
    recipes : [...res.locals.recipes],
    days: [...res.locals.days]
  })
); 

// updates information on specific recipe
router.put('/:id',
  recipeController.editRecipe,
  recipeController.getRecipes,
  weekdayController.getDays,
  (req,res) => res.status(200).json({
    recipes : [...res.locals.recipes],
    days: [...res.locals.days]
  })
);




module.exports = router; 