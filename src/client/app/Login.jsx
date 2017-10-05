import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogIn(e) {
    let user = { username: this.state.username, password: this.state.password };
    this.props.onLoginSubmit(user);
    e.preventDefault();
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <h2> Login </h2>
        <div id="login" className="pull-right">
          <form onSubmit={this.handleLogIn}>
            <label>e-mail</label>&nbsp;&nbsp;
            <input type="email" placeholder="name@example.com" onChange={this.handleUsername} required></input> <br /><br />
            <label>password</label>&nbsp;&nbsp;
            <input type="password" onChange={this.handlePassword} required></input> <br /><br />
            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
