import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="login">
        username &emsp;
          <input type="text"></input> <br /><br />

        password &emsp;
          <input type="text"></input> <br /><br />
          <button type="submit" id="submit"> Submit </button>
      </div>
    );
  }
}

export default Login;