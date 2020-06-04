import React, { Component } from 'react';
import DaysContainer from './Containers/DaysContainer';
import Loader from './Views/Loader';
import RecipeSearch from './Modals/RecipeSearch';
import NewRecipe from './Modals/NewRecipe';
import ViewRecipe from './Modals/ViewRecipe';
import EditRecipe from './Modals/EditRecipe';
import bodyStyles from '../styles/mainPageStyles.css';



const domain = process.env.NODE_ENV === 'production' ? 'localhost:3000' : 'localhost:8080';
console.log(domain)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipeInFocus: '',
      dayInFocus: '', 
      modalVisible: false,
      modal: '', 
      fetching: true,
      newIngredient: {
        name: '',
        amount: ''
      },
      newRecipe: {
        title: '',
        recipe: '',
        ingredients: [],
        notes: '',
        favorite: false,
        tags: []
      },
      recipes: [],
      days: []
    };

    // bind methods to our class
    this.toggleRecipeSearch = this.toggleRecipeSearch.bind(this);
    this.toggleNewRecipe = this.toggleNewRecipe.bind(this);
    this.toggleViewRecipe = this.toggleViewRecipe.bind(this);
    this.toggleEditRecipe = this.toggleEditRecipe.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getModal = this.getModal.bind(this);
    this.setDayInFocus = this.setDayInFocus.bind(this);
    this.getRecipeInfo = this.getRecipeInfo.bind(this);
    this.updateNewRecipe = this.updateNewRecipe.bind(this);
    this.updateNewIngredient = this.updateNewIngredient.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
    this.populateCalendar = this.populateCalendar.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }

  componentDidMount() {
    this.populateCalendar();

    // to close open modals
    document.addEventListener('click', this.closeModal)
  }

  componentWillUnmount() {
    // remove event listener at unmounting
    document.removeEventListener('click', this.closeModal)
  }

  populateCalendar() {
     // get recipe and day data
     fetch(`http://${domain}/recipes`)
     .then(res => res.json())
     .then(data => {
       console.log('from GET :', data)
       this.setState({
         fetching: false,
         ...data
       });
     })
     .catch(err => console.log(err)); 
  }

  setDayInFocus(day) {
    this.setState({
      dayInFocus : day
    })
  }

  // updates the passed in field on newRecipe to be passed in value
  updateNewRecipe(field, value){
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        [field]: value
      }
    })
  }

  // updates the passed in field on newRecipe to be passed in value
  updateNewIngredient(field, value) {
    this.setState({
      newIngredient: {
        ...this.state.newIngredient,
        [field]: value
      }
    })
  }

  addNewIngredient(e){
    e.preventDefault();

    // add current new ingredient to ingredients array of new recipe
    this.setState({
      newRecipe: {
        ...this.state.newRecipe,
        ingredients : [...this.state.newRecipe.ingredients, this.state.newIngredient]
      },
      newIngredient: {
        name: '',
        amount: ''
      }
    })
  }

  addRecipe(e){
    e.preventDefault();
  
    // make Post request, putting current day in params, and sending the new recipe
    fetch(`http://${domain}/recipes/${this.state.dayInFocus}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newRecipe)
    })
      .then(res => res.json())
    // post sends back all the current recipes, so reset state to be whatever comes back
      .then(data => {
        this.setState({
          fetching: false,
          ...data
        });
      })
      .catch(err => console.log(err))
    
    // so components don't render before they are ready
    this.setState({
      fetching: true
    })
  }

  // removes recipe from UI
  removeRecipe(e, dayId, id){
    // go through days in state, delete it from state, then update DB
    e.preventDefault();
    e.stopPropagation();

    // go through days array, looking for desired day
    // then go through recipes array, making a copy of the array minus the selected recipe
    const newDays = this.state.days.map(day => {
      if (dayId === day.day) {
        
        const newRecipeList = day.recipes.map(recipe => {
          if (recipe === id) {
            return;
          };
          return recipe
        })

        return {
          ...day, 
          recipes: newRecipeList};

      } else {
        return day; 
      }
    })
    // update state 
    this.setState({
      days: newDays
    });

    // // // update database
    // fetch(`http://${domain}/recipes/day/${dayId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     id : id
    //   })
    // })
    //   .then(res => res.json())
    // // put sends back all the current recipes, so reset state to be whatever comes back
    //   .then(data => {
    //     this.setState({
    //       fetching: false,
    //       ...data
    //     });
    //   })
    //   .catch(err => console.log(err))

    // // set "fetching to be true" so components don't try to render
    // this.setState({
    //   fetching: true
    // })
  }

  editRecipe(e){
    e.preventDefault();
  
    // make Put, passing in _id of desired recipe, stored in state.recipeInFocus
    fetch(`http://${domain}/recipes/${this.state.recipeInFocus._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newRecipe)
    })
      .then(res => res.json())
    // post sends back all the current recipes, so reset state to be whatever comes back
      .then(data => {
        console.log('just got back :  ', data)
        this.setState({
          fetching: false,
          ...data
        });
      })
      .catch(err => console.log(err))
    
    // so components don't render before they are ready
    this.setState({
      fetching: true,
      recipeInFocus: '',
      // remember to close modal
      modalVisible: false
    })
  }

  // deletes ar ecipe
  deleteRecipe(){

  }

  closeModal(e){
    if (this.state.modalVisible && e.target.className === 'modal-container') {
      console.log('closing modal')
      this.setState({
        modalVisible: false 
      })
    }
  }

  getModal() {
    // returns the JSX element that corresponds to currently selected modal
    switch(this.state.modal) {
      case 'RecipeSearch':
        return <RecipeSearch toggleNewRecipe={this.toggleNewRecipe}/>;
      case 'NewRecipe':
        return <NewRecipe 
          newRecipe={this.state.newRecipe} 
          updateNewRecipe={this.updateNewRecipe} 
          newIngredient={this.state.newIngredient}
          updateNewIngredient={this.updateNewIngredient}
          addNewIngredient={this.addNewIngredient}
          addRecipe={this.addRecipe}/>
      case 'ViewRecipe':
        return <ViewRecipe recipe={this.state.recipeInFocus} toggleEditRecipe={this.toggleEditRecipe}/>
      case 'EditRecipe':
        return <EditRecipe
          newRecipe={this.state.newRecipe} 
          updateNewRecipe={this.updateNewRecipe} 
          newIngredient={this.state.newIngredient}
          updateNewIngredient={this.updateNewIngredient}
          addNewIngredient={this.addNewIngredient}
          editRecipe={this.editRecipe}/>
      default:
        return '';
    }
  }

  toggleRecipeSearch(day) {
    // display modal, designate current modal as RecipeSearch
    this.setState({
      modalVisible: true,
      modal : 'RecipeSearch'
    })
    // set day in focus
    this.setDayInFocus(day);
  }

  toggleNewRecipe() {
    // display modal, designate current modal as NewRecipe
    this.setState({
      modalVisible: true,
      modal: 'NewRecipe'
    })
  }

  toggleViewRecipe(id) {
    // toggles modal that will show recipe
    this.setState({
      modalVisible: true,
      modal: 'ViewRecipe'
    });

    // passes along so get Recipe info can find recipe specific info
    this.getRecipeInfo(id);
  }

  toggleEditRecipe(id) {

    this.setState({
      // toggles modal that will allow us to edit recipe
      modalVisible: true,
      modal: 'EditRecipe',
      // save current recipe's info as new recipe, so it can be rendered in edit recipe page, spread for good measure
      newRecipe: {
        ...this.state.recipeInFocus,
        ingredients: [...this.state.recipeInFocus.ingredients],
        tags: [...this.state.recipeInFocus.tags]
      },
    })
  }

  getRecipeInfo(id) {
    // populates ViewRecipe modal with id-specific information
    for (const key in this.state.recipes) {
      if (this.state.recipes[key]._id === id) {
        this.setState({
          recipeInFocus: this.state.recipes[key]
        })
      };
    };
  }

  

  render() {
    // show loader if fetching for data
    const modal = this.getModal(); 

    const display = this.state.fetching 
      ? <Loader />
      : <DaysContainer 
          recipes={this.state.recipes} 
          days={this.state.days} 
          toggleRecipeSearch = {this.toggleRecipeSearch}
          toggleViewRecipe={this.toggleViewRecipe}
          removeRecipe={this.removeRecipe}
          />

    return (
      <div className='app'>
        {display}
        {this.state.modalVisible ? modal : ''}
      </div>
    )
  }
}

export default App; 
