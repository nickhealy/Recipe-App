const mongoose = require('mongoose'); 

const MONGO_URI = `mongodb+srv://nickrhealy:NrhsjHrLs1926@cluster0-20m9a.mongodb.net/test?retryWrites=true&w=majority`; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Recipe-App'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err)); 

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
  recipe: String,
  history: [
    {
      date: Date,
      notes: String,
      pictures: [
        String
      ]
    }
  ]
})

const Recipe = mongoose.model('recipe', recipeSchema); 

module.exports = Recipe; 