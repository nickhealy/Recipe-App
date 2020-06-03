const mongoose = require('mongoose');

// connect to MongoDB

const MONGO_URI = `mongodb+srv://nickrhealy:NrhsjHrLs1926@cluster0-20m9a.mongodb.net/test?retryWrites=true&w=majority`; 

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Recipe-App',
  useFindAndModify: false
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err)); 



module.exports = {
  Recipe: require('./recipeModel'),
  Weekday: require('./weekdayModel')
}