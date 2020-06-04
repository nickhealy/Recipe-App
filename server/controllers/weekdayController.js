const { Weekday } = require('../models/index'); 

const weekdayController = {}; 

weekdayController.addToDay = (req, res, next) => {
  // day recipe is added to is pulled out of parameters object
  const { day } = req.params; 
  const newId = res.locals.newRecipeId || req.params.id
  
  Weekday.findOneAndUpdate(
    { day }, 
    // add id from newly created recipe to recipes array on Weekday table (stored in recipeController)
    { $push: { 
        recipes: { _id : newId }
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

weekdayController.removeFromDay = (req, res, next) => {
  // get id of targeted receips from params
  const { id } = req.params;
  console.log('want to delete :', id)
  // find day, then update recipes array on that day to exclude the targeted recipe
  Weekday.findOne({ _id: ObjectId(id)}, (err, data) => {
    console.log('this is what I am finding: ', data)
  })
  Weekday.findOneAndUpdate({ _id: id}, 
    { 
      // extract from recipes array recipe with same id
      $pull: {
        recipes: {
          _id: id
        }
      }
    }, 
    { new: true},
    (err, deleted) => {
      if (err) return next({
        log: `Error at Weekday.findOneAndUpdate. Error : ${err}`,
        message: 'An error occured, check surver log for details'
      });

      console.log('just deleted: ', deleted)
      return next();
    })
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

weekdayController.updateDays = async (req, res, next) => {

  console.log('what I was sent :', req.body);

  await req.body.forEach(weekday => {
    const { _id, recipes, day } = weekday; 
    console.log('recipes I have sent')

    Weekday.findByIdAndUpdate(_id, { recipes }, {new: true}, (err, data) => {
      if (err) return next({
        log: `Error at Weekday.updateDays. Error : ${err}`,
          message: 'An error occured, check surver log for details'
      });
      console.log('updated data :', data)
    })
  })

  return next();
}

module.exports = weekdayController; 