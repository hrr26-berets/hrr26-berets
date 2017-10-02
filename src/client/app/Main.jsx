import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PopularItems from './PopularItems.jsx';
import SearchBar from './SearchBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

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
    searchResults: [],
    loggingIn: false,
    signingUp: false,
    loggedIn: false,
    user: null
    };
  }

  handleLoggingIn() {
    this.setState({ loggingIn: !this.state.loggingIn });
  }

  handleSigningUp() {
    this.setState({ signingUp: !this.state.signingUp });
  }

  handleLogIn(user) {
    axios.post('/login', user)
      .then((res) => {
        this.setState({
          loggedIn: true,
          user: user.username,
          loggingIn: false
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSignUp(user) {
    axios.post('/signup', user)
      .then((res) => {
        this.setState({
          loggedIn: true,
          user: user.username,
          signingUp: false
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }

  handleLogOut() {
    axios.get('/logout')
      .then((res) => {
        this.setState({
          loggedIn: false,
          user: null
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSearch(products) {
    console.log(products)
    this.setState({ searchResults: products })
    console.log(this.state)
  }



  render() {
    return (
      <div className="container">
        <h1>wishlist</h1>
        <div className="col-xs-7 row">
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
          <Modal
            isOpen={this.state.signingUp}
            onRequestClose={this.handleSigningUp.bind(this)}
            contentLabel="Signup"
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
            <Signup onSignupSubmit={this.handleSignUp.bind(this)}/>
          </Modal>
        </div>
        <div className="col-xs-7 pull-right row">
          {
            (this.state.loggedIn)
              ? <span> Welcome, <strong>{this.state.user}</strong>!&nbsp;&nbsp;<a href="#" onClick={this.handleLogOut.bind(this)}>Log Out</a>&nbsp;&nbsp;</span>
              :
              <span><a href="#" onClick={this.handleLoggingIn.bind(this)}>Log In</a>&nbsp;&nbsp;
                <a href="#" onClick={this.handleSigningUp.bind(this)}>Sign Up</a>&nbsp;&nbsp;</span>
          }
          <SearchBar handleSearch={this.handleSearch.bind(this)}/>
        </div>
        <div className="col-xs-12 container">
          <h3>Popular Items</h3>
          <PopularItems products={this.state.popular}/>
        </div>
      </div>
      )
  }
}

export default Main;
