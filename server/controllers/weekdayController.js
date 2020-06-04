const { Weekday } = require('../models/index'); 

const weekdayController = {}; 

weekdayController.addToDay = (req, res, next) => {
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

weekdayController.updateDay = (req, res, next) => {
  const { day } = req.params; 
  const { id } = req.body; 

  console.log('day in request is :', day);
  console.log('id in request is: ', id)

  Weekday.findOneAndUpdate(
    { day },
    { $pull: {
      recipes : { _id : id }
      }
    },
    (err, found) => {
      if (err) return next({
        log: `Error at Weekday.updateDay. Error : ${err}`,
        message: 'An error occured, check surver log for details'
      });

      console.log('found :', found)
      return next();
    }
  )
  
}

module.exports = weekdayController; 