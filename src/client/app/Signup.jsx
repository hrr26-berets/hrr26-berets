import React from 'react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Name
          <input> </input>
        Password
          <input></input>
          <button type="submit"> Submit </button>
       </div>
    );
  }
}

export default Signup;