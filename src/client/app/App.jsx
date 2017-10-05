import React from 'react';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import Main from './Main.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import ProductDetails from './ProductDetails.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: ''
    };
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => (<Main {...props}/>)} />
            <Route exact path="/signup" loggedIn={this.state.loggedIn} username={this.state.username} render={(props) => (<Signup {...props}/>)} />
            <Route exact path="/login" render={(props) => (<Login {...props}/>)} />
            <Route exact path="/productDetails" render={(props) => (<ProductDetails {...props}/>)} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
