import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import './index.css'

import CardList from './CardList.js'
import HomePage from './HomePage.js'
import NotFound from './notfound.js'
import Data from './Data.js'

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
        <section>
          <div>
            <Router>
              <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/cardlist" exact component={CardList} />
                  <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </div>
        </section>
    )};
};

export default App;
