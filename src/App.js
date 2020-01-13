import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import CardList from './CardList.js'
import HomePage from './HomePage.js'
import NotFound from './notfound.js'
import './App.css';
import './index.css'

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/cardlist" exact component={CardList} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
	)};
};

export default App;
