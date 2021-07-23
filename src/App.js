import React, { Component } from 'react';
import './App.css';
import Dashboard from './Player/Dashboard.js';
import Navbar from './navbar/Navbar.js';

class App extends Component {
  render() {
    return(
        <div>
            <Navbar />
            <Dashboard />
        </div>
    );
  }
}

export default App;
 