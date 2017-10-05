import React from 'react';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import Main from './Main.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => (<Main {...props}/>)} />
            <Route exact path="/signup" render={(props) => (<Signup {...props}/>)} />
            <Route exact path="/login" render={(props) => (<Signup {...props}/>)} />


          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;