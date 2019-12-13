import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import CardList from './CardList.js'
import Data from './Data.js'

import './index.css'

function loadCards() {
    if (!localStorage["CardSet"])
    {
      let obj = JSON.stringify(Data)
      localStorage["CardSet"] = obj
    }
}

function loadShowCardsState() {
    if(!localStorage["showCardsState"])
    {
      localStorage["showCardsState"] = "all"
    }
}

class App extends Component {
  render() {
    loadCards()
    loadShowCardsState()

    return ( 
        <div className="card-list">
          {/* { console.log(Data) } */}
          <CardList />
        </div>    
    )};
};

export default App;
