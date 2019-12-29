import React, { Component } from 'react';
import './App.css';

//React-Router
import { HashRouter as Router, Route } from 'react-router-dom';

//Route file imports
import Home from '../pages/Home/home';
import Details from '../pages//Details/details';
import Edit from '../pages/Edit/edit';

//importing apollo and setup
import ApolloClient from 'apollo-boost';
import {  ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'HTTP://localhost:5000/graphql'
})

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Prime Movie Weekend!</h1>
          </header>
          <div className="App-body">
            <Route path="/" exact component={Home} />
            <Route path="/details" component={Details} />
            <Route path="/edit" component={Edit} />
          </div>
        </div>
      </Router>
      </ApolloProvider>
    );
  }
}

export default App;
