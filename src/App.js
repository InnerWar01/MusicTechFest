import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './home';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Musicly',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">         
          {/* We rended different component based on the path */}
          <Route exact path="/" render={() => <Home/>}/>
        </header>
      </div>
    );
  }
}

export default App;
