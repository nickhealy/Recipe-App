const { Weekday } = require('../models/index'); 

const weekdayController = {}; 

weekdayController.updateDay = (req, res, next) => {
  // day recipe is added to is pulled out of parameters object
  const { day } = req.params; 
  
  Weekday.findOneAndUpdate(
    { day }, 
    // add id from newly created recipe to recipes array on Weekday table (stored in recipeController)
    { $push: { 
        recipes: { _id : res.locals.newRecipeId }
      }
    }, 
    // return updated day
    { new: true},
    (err, newDay) => {
      if (err) return next({
        log: `Error at Weekday.findOneAndUpdate. Error : ${err}`,
        message: 'An error occured, check surver log for details'
      });

      return next();
    }
    )
}

weekdayController.getDays = (req, res, next) => {
  // get all days
  Weekday.find({}, (err, days) => {
    if (err) return next({
      log: `Error at Weekday.getDays. Error : ${err}`,
        message: 'An error occured, check surver log for details'
    });

    // store days in res.locals, and move to next piece of middleware
    res.locals.days = days;
    return next();
  })
}

module.exports = weekdayController; 