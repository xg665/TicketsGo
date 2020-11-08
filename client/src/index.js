import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import {Link, Route, Switch, useHistory, withRouter, BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  	<Switch>
  		<Route path="/" exact component={ App }/>
  		<Route path="/Home" exact component={ Home }/>
  	</Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
