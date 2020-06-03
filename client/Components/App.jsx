import React, { Component } from 'react';
import DaysContainer from './Containers/DaysContainer';
import Loader from './Views/Loader'
import styles from '../styles.css';



const domain = process.env.NODE_ENV === 'production' ? 'localhost:3000' : 'localhost:8080';
console.log(domain)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fetching: true,
      recipes: {},
      days: {}
    };
  }

  componentDidMount() {
    // get recipe and day data
    console.log("mounted!")
    fetch(`http://${domain}/recipes`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          fetching: false,
          ...data
        });
        console.log('data just fetched :', data)
      })
      .catch(err => console.log(err)); 
  }
  render() {
    // show loader if fetching for data
    const display = this.state.fetching 
      ? <Loader />
      : <DaysContainer recipes={this.state.recipes} days={this.state.days} />
    return (
      <div className='app'>
        {display}
      </div>
    )
  }
}

export default App; 
