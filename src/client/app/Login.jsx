import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.logIn = this.logIn.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  logIn(e) {
    e.preventDefault();
    let user = { username: this.state.username, password: this.state.password };
    this.props.handleLogIn(user);
    this.setState({ password: '' });

  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/'/>;
    }
    return (
      <div>
        <h2> Login </h2>
        <div id="login" className="pull-left">
          <form onSubmit={this.logIn}>
            <label>e-mail</label>&nbsp;&nbsp;
            <input type="email" placeholder="name@example.com" onChange={this.handleUsername} value={this.state.username} required></input> <br /><br />
            <label>password</label>&nbsp;&nbsp;
            <input type="password" value={this.state.password} onChange={this.handlePassword} required></input> <br /><br />
            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
