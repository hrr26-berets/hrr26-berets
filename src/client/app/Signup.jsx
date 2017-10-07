import React from 'react';
import { Redirect } from 'react-router-dom';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.signUp = this.signUp.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  signUp(e) {
    e.preventDefault();
    let user = { username: this.state.username, password: this.state.password };
    this.props.handleSignUp(user);
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
        <h2> &emsp; &nbsp; Signup </h2>
        <div id="login" className="pull-left">
          <form onSubmit={this.handleSignUp}>
            <label>e-mail</label>&nbsp;&nbsp;
            <input type="email" placeholder="name@example.com" onChange={this.handleUsername} required></input> <br /><br />
            <label>password</label>&nbsp;&nbsp;
            <input type="password" onChange={this.handlePassword} required></input> <br /><br />
            <button type="submit" onClick={this.signUp}> Submit </button>
          </form>
        </div>
      </div>

    );
  }
}

export default Signup;
