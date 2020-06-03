import React, { Component } from 'react';
import DaysContainer from './Containers/DaysContainer';
import Loader from './Views/Loader';
import RecipeSearch from './Modals/RecipeSearch';
import NewRecipe from './Modals/NewRecipe';
import bodyStyles from '../styles/mainPageStyles.css';



const domain = process.env.NODE_ENV === 'production' ? 'localhost:3000' : 'localhost:8080';
console.log(domain)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dayInFocus : '', 
      modalVisible: false,
      modal: '', 
      fetching: true,
      newRecipe: {},
      recipes: {},
      days: {}
    };

    // bind methods to our class
    this.toggleRecipeSearch = this.toggleRecipeSearch.bind(this);
    this.toggleNewRecipe = this.toggleNewRecipe.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getModal = this.getModal.bind(this);
    this.setDayInFocus = this.setDayInFocus.bind(this);
    this.updateNewRecipe = this.updateNewRecipe.bind(this);
  }

  componentDidMount() {
    // get recipe and day data
    fetch(`http://${domain}/recipes`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          fetching: false,
          ...data
        });
      })
      .catch(err => console.log(err)); 

      // TODO: add event listener, figure out how we are getting out of each modal
      document.addEventListener('click', this.closeModal)
  }

  componentWillUnmount() {
    // remove event listener at unmounting
    document.removeEventListener('click', this.closeModal)
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
        return <NewRecipe newRecipe={this.state.newRecipe} updateNewRecipe={this.updateNewRecipe}/>
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

  

  render() {
    // show loader if fetching for data
    const modal = this.getModal(); 

    const display = this.state.fetching 
      ? <Loader />
      : <DaysContainer 
          recipes={this.state.recipes} 
          days={this.state.days} 
          toggleRecipeSearch = {this.toggleRecipeSearch}
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
