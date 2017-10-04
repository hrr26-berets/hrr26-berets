import React from 'react';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';

import Main from './Main.jsx';

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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;