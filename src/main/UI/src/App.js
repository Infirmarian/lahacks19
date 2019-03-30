import React, { Component } from 'react';
import Routes from './Routes'
import Globals from './GlobalElements/Globals'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Globals/>
          <Routes/>
      </div>
    );
  }
}

export default App;
