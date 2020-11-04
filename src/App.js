import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Swapi from './Swapi'
import Users from './Users'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route path="/" exact>
            <Swapi/>
          </Route>

          <Route path="/query" exact>
            <Swapi/>
          </Route>

          <Route path="/mutation" exact>
            <Users/>
          </Route>

        </Switch>
      </Router>
    </div>
  )
}
export default App;
