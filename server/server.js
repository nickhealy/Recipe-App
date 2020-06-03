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

app.use((err, req, res, next) => {
  // create default error
  const defaultErr = {
    log: 'Express middleware caught unknown error', 
    status: 400, 
    message: { err: 'An Error occured'}
  }; 
  const errObj = Object.assign({}, defaultErr, err); 
  console.log(errObj);
  // send back created error's status, with error's message as JSON
  res.status(errObj.status).json(errObj.message);
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});