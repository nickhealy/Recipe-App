const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

// model for all recipe additions to DB

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: String,
      amount: String
    }
  ],
  tags: [String],
  favorite: Boolean,
  recipe: String,
  notes: String
})

const Recipe = mongoose.model('recipe', recipeSchema); 

module.exports = Recipe; 