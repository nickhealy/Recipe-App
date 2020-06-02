const express = require('express');
const app = express(); 
const path = require('path'); 

const recipeRouter = require('./routes/recipeRouter');

const PORT = 3000; 
// parse any incoming requests
app.use(express.json());

// serve static files **REMEMBER TO DO THIS!!!*
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// serve homepage
app.get('/', (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
}); 

// route all recipe requests
app.use('/recipes', recipeRouter);

// catch-all errors for bad requests
app.get('*', (req, res) => {
  res.sendStatus(404); 
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});