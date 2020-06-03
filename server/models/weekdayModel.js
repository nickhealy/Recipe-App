const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

// weekday schema: contains an array of the recipes in order

const weekdaySchema = new Schema({
  day: String,
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'recipe'
    }
  ]
})

const Weekday = mongoose.model('weekday', weekdaySchema); 

module.exports = Weekday; 