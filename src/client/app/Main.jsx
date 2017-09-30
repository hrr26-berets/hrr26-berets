import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PopularItems from './PopularItems.jsx';
import SearchBar from './SearchBar.jsx';
import Login from './Login.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [
      {_id: 1, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'},
      {_id: 2, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'},
      {_id: 3, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'},
      {_id: 4, name: 'pizza', salePrice: 3.99, thumbnailImage: 'https://i5.walmartimages.com/asr/2521fd6c-b947-4b2d-9a31-7887d1f1a0c0_1.659b2d798672c8f5e1338d929452b74e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF'}
    ],
    loggingIn: false,
    loggedIn: false
    };
  }

  handleLoggingIn() {
    console.log('opening log in modal')
    console.log(this.state.loggingIn);
    this.setState({ loggingIn: !this.state.loggingIn });
  }

  handleLogIn() {
    console.log('trying to log in!')
    // TODO: if req.session.user is not null, setState loggdIn to true
  }

  render() {
    return (
      <div className="container">
        <h1>wishlist</h1>
        <Modal
          isOpen={this.state.loggingIn}
          onRequestClose={this.handleLoggingIn.bind(this)}
          contentLabel="Login"
          style={{
            content: {
              position: 'absolute',
              height: '320px',
              width: '350px',
              left: '35%',
              right: '35%',
              bottom: '35%'
            }
          }}
        >
          <Login onLoginSubmit={this.handleLogIn.bind(this)}/>
        </Modal>
        <div>
          <a href="#" onClick={this.handleLoggingIn.bind(this)}>Log In</a>
          <SearchBar className="pull-right"/>
        </div>
        <PopularItems products={this.state.popular}/>
      </div>
      )
  }
}

export default Main;
