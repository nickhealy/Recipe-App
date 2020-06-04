import React, { Component } from 'react';
import DaysContainer from './Containers/DaysContainer';
import Loader from './Views/Loader';
import RecipeSearch from './Modals/RecipeSearch';
import NewRecipe from './Modals/NewRecipe';
import ViewRecipe from './Modals/ViewRecipe';
import EditRecipe from './Modals/EditRecipe';
import Controls from './Containers/Controls';
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
      newTags: [],
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
    this.toggleTag = this.toggleTag.bind(this);
    this.saveCalendar = this.saveCalendar.bind(this);
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

    // we need to add the new tags to the new recipe we are creating
    const newRecipe = {
      ...this.state.newRecipe,
      tags: this.state.newTags
    }
  
    // make Post request, putting current day in params, and sending the new recipe
    fetch(`http://${domain}/recipes/${this.state.dayInFocus}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
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
    
      this.setState({
        // so components don't render before they are ready
        fetching: true,
        // reset new Recipe and new Tags
        newRecipe: {
          title: '',
          recipe: '',
          ingredients: [],
          notes: '',
          favorite: false,
          tags: []
        },
        newTags : []
    })
  }

  // removes recipe from UI
  removeRecipe(e, dayId, id){
    e.preventDefault();
    e.stopPropagation();
    // go through days in state, then delete it
    // do this by push all but the targeted day as is onto an array
    // at the target day, we are going to do the same thing, but with the recipe list
    // after we've reset the recipe list on the targeted way, we will push that day onto the array, then add it to our state

    const newState = [];

    this.state.days.forEach(day => {
     
      if(day.day === dayId) {
        console.log('im inside!!')
        const recipes = [];

        day.recipes.forEach(recipe => {
          if (recipe === id) return;;
          recipes.push(recipe);
        })

        // after re-setting recipes, put it onto the current day, and push day onto newState
        day.recipes = recipes
      } 
      
      newState.push(day); 
      
    })

    this.setState({
      days: newState
    })
    

  }

  editRecipe(e){
    e.preventDefault();

  // combine new tags into recipe
    const newRecipe = {
      ...this.state.newRecipe,
      tags: this.state.newTags
    }
  
    // make Put, passing in _id of desired recipe, stored in state.recipeInFocus
    fetch(`http://${domain}/recipes/${this.state.recipeInFocus._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
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

  saveCalendar(e){
    // sends the current days data to the server and updates it
    e.preventDefault();
    e.stopPropagation();

    fetch(`http://${domain}/recipes/day`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.days)
    })
      .then(res => res.json())
    // put sends back all the current recipes, so reset state to be whatever comes back
      .then(data => {
        this.setState({
          fetching: false,
          ...data
        });
      })
      .catch(err => console.log(err))

    // set "fetching to be true" so components don't try to render
    this.setState({
      fetching: true
    })
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
          addRecipe={this.addRecipe}
          tags={this.state.newTags}
          toggleTag={this.toggleTag}
          />
      case 'ViewRecipe':
        return <ViewRecipe recipe={this.state.recipeInFocus} toggleEditRecipe={this.toggleEditRecipe}/>
      case 'EditRecipe':
        return <EditRecipe
          newRecipe={this.state.newRecipe} 
          updateNewRecipe={this.updateNewRecipe} 
          newIngredient={this.state.newIngredient}
          updateNewIngredient={this.updateNewIngredient}
          addNewIngredient={this.addNewIngredient}
          editRecipe={this.editRecipe}
          tags={this.state.newTags}
          toggleTag={this.toggleTag}
          />
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
      },
      newTags: [...this.state.recipeInFocus.tags]
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

  toggleTag(e, name){
    e.preventDefault();
    // either add new tag to tags in newTags array if it's not there already
    // or make a new copy of the tags array, minus the passed in tag
    let newTags = []; 

    if (this.state.newTags.includes(name)) {

      this.state.newTags.forEach(tag => {
        // only pushing to newTags the tags that don't match the passed in name
        if (tag !== name) {
          newTags.push(tag);
        } 
      });
    } else  {
      // making copy of state, with passed in name at the end
      newTags = [...this.state.newTags, name];
    };;

    this.setState({
      newTags: newTags
    });
  }

  

  render() {
    // show loader if fetching for data
    const modal = this.getModal(); 

    const controls = 
      <div id='controls-container' className='flex'>
        <button class='submit' id='save-calendar' onClick={this.saveCalendar}>Save Calendar</button>
        <button class='submit' id='get-list' onClick={this.getShoppingList}>Get Shopping List</button>
      </div>

    const display = this.state.fetching 
    // show loader if fetching data, otherwise show display
      ? <Loader />
      : <>
          <DaysContainer 
            recipes={this.state.recipes} 
            days={this.state.days} 
            toggleRecipeSearch = {this.toggleRecipeSearch}
            toggleViewRecipe={this.toggleViewRecipe}
            removeRecipe={this.removeRecipe}
            />
          {/* these two buttons save the current state of the calendar, or generate the user's shopping list */}
          <Controls 
            getShoppingList={this.getShoppingList}
            saveCalendar={this.saveCalendar}
            />
        </>

    return (
      <div className='app'>
        {display}
        {this.state.modalVisible ? modal : ''}
      </div>
    )
  }
}

export default App; 
