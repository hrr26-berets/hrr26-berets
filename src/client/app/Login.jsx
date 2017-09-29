import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h2> Login </h2>
        <div id="login">
          username &emsp;
          <input type="text"></input> <br /><br />
          password &emsp;
          <input type="text"></input> <br /><br />
          <button type="submit" id="submit"> Submit </button>
        </div>
      </div>
    );
  }
}

export default Login;